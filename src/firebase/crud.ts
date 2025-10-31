import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocFromCache,
  getDocFromServer,
  getDocs,
  onSnapshot,
  type Query,
  QueryConstraint,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  writeBatch
} from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable
} from 'firebase/storage'
import { v4 as uidGenerator } from 'uuid'

export class FirebaseCRUD {
  dateType: 'date' | 'number' | 'timestamp'
  static uploadFile() { //setURL: ((url: string) => void) | undefined //files: FileList | null,
    throw new Error('Method not implemented.')
  }

  collectionName: string
  db: any
  storage: any

  constructor(collectionName = '', firebaseDB: any, firebaseStorage: any) {
    this.collectionName = collectionName
    this.db = firebaseDB
    this.storage = firebaseStorage
    this.dateType = 'date'
  }

  /**
   *
   * @param file Blob | Uint8Array | ArrayBuffer, directly from input file
   * @param fieldName this is the directory where the images will be stored
   * @callback cb a function to return the progress
   *
   */

  uploadFile = (
    file: Blob | Uint8Array | ArrayBuffer,
    fieldName = '',
    cb: (progress: number, downloadURL: string | null) => void
  ) => {
    const storageRef = (path = '') => ref(this.storage, path)
    const uuid = uidGenerator()
    const imageRef = storageRef(`${fieldName}/${uuid}`)
    const uploadTask = uploadBytesResumable(imageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`Upload is ${progress}% done`)
        cb(progress, null)
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        console.log({ error })
        cb(-1, null)
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          cb(100, downloadURL)
        })
      }
    )
  }

  /**
   *
   * @param url should be a url from firebase storage
   * @returns
   */
  deleteFile = async (url: string) => {
    const desertRef = ref(this.storage, url)
    try {
      return await deleteObject(desertRef).then((res) => {
        return this.formatResponse(
          true,
          `${this.collectionName}_IMAGE_DELETED`,
          res
        )
      })
    } catch (error) {
      console.log({ error })
    }
  }

  uploadJSON = async ({ json }: { json: any[] }) => {
    try {
      //* TODO: should delete id?
      const batch = writeBatch(this.db)
      const data = json

      const promises = data.map(async (document) => {
        const docRef = await addDoc(
          collection(this.db, this.collectionName),
          document
        )
        return batch.set(docRef, { id: docRef.id, ...document })
      })
      await Promise.all(promises)
      await batch.commit()
      return this.formatResponse(true, 'JSON_UPLOADED', {})
    } catch (error) {
      return this.formatResponse(false, 'JSON_UPLOADED_ERROR', error)
    }
  }

  // -------------------------------------------------------------> CRUD-Items

  /**
   *
   * @param item object to create
   * @returns promise add doc
   */

  createItemMetadata() {
    return {
      createdBy: '',
      createdAt: new Date()
    }
  }

  updateItemMetadata() {
    return {
      updatedAt: new Date(),
      updatedBy: ''
    }
  }

  async createItem(item: object) {
    const newItem = {
      ...item,
      ...this.createItemMetadata()
    }

    return await addDoc(collection(this.db, this.collectionName), newItem).then(
      (res) =>
        this.formatResponse(true, `${this.collectionName}_CREATED`, {
          id: res.id
        })
    )
  }

  async updateItem(itemId: string, item: object) {
    const newItem = {
      ...item,
      ...this.updateItemMetadata()
    }
    return await updateDoc(doc(this.db, this.collectionName, itemId), newItem)
      .then(() =>
        this.formatResponse(true, `${this.collectionName}_UPDATED`, {
          id: itemId
        })
      )
      .catch((err) => console.error(err))
  }

  async setItem(itemId: string, newItem: object) {
    const item = {
      id: itemId,
      ...this.createItemMetadata(),
      ...newItem
    }

    return await setDoc(doc(this.db, this.collectionName, itemId), item)
      .then(() =>
        this.formatResponse(true, `${this.collectionName}_CREATED`, {
          item
        })
      )
      .catch((err) => console.error(err))
  }

  /**
   * get a single document from the collection
   * @param itemId the id of the document to get
   */
  async getItem(itemId: string) {
    const ref = doc(this.db, this.collectionName, itemId)
    // const docSnap = await getDoc(ref)
    let docSnap: any
    try {
      docSnap = await getDocFromCache(ref)
      console.log('doc from cache')
    } catch (_error) {
      console.log('doc from server')
      docSnap = await getDocFromServer(ref)
    }
    return this.normalizeItem(docSnap)
  }

  /**
   * * get all documents in a collection implementing filters
   * @param filters: where(itemField,'==','value')
   */
  async getItems(filters: QueryConstraint[]) {
    this.validateFilters(filters, this.collectionName)
    const q: Query = query(collection(this.db, this.collectionName), ...filters)

    const querySnapshot = await getDocs(q)
    // let querySnapshot
    // try {
    //   querySnapshot = await getDocsFromCache(q)
    //   console.log('docs from cache')
    // } catch (error) {
    //   console.log('docs from server')
    //   querySnapshot = await getDocsFromServer(q)
    // }

    const res: any[] = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      res.push(this.normalizeItem(doc))
    })
    return res
  }

  async deleteItem(itemId: string) {
    return await deleteDoc(doc(this.db, this.collectionName, itemId))
      .then((res) =>
        this.formatResponse(true, `${this.collectionName}_DELETED`, res)
      )
      .catch((err) => console.error(err))
  }

  async deleteItems(filters: QueryConstraint[] = []): Promise<
    {
      type: string
      ok: boolean
      res: {
        id: string
      }
    }[]
  > {
    this.validateFilters(filters, this.collectionName)
    const q: Query = query(collection(this.db, this.collectionName), ...filters)

    const querySnapshot = await getDocs(q)
    const res: any[] = []
    querySnapshot.forEach((doc) => {
      res.push(
        deleteDoc(doc.ref)
          .then((res) =>
            this.formatResponse(true, `${this.collectionName}_DELETED`, res)
          )
          .catch((err) => console.error(err))
      )
    })
    return res
  }

  /**
   * * get all documents in a collection implementing filters
   * @param filters: QueryConstraint  where(itemField,'==','value')
   */
  async getUserItems(filters: QueryConstraint[]) {
    const q: Query = query(collection(this.db, this.collectionName), ...filters)

    const querySnapshot = await getDocs(q)
    const res: any[] = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      res.push(this.normalizeItem(doc))
    })
    return res
  }

  async listenItem(itemId: string, cb: CallableFunction) {
    if (!itemId) return console.error('invalid value', { itemId })
    const q = doc(this.db, this.collectionName, itemId)

    onSnapshot(q, (doc) => {
      cb(this.normalizeItem(doc))
    })
  }

  /**
   * listen all documents in a collection implementing filters
   * @param filters[]: where(itemField,'==','value')
   * @param cb callback with array of items
   */
  async listenItems(filters: QueryConstraint[], cb: CallableFunction) {
    this.validateFilters(filters, this.collectionName)

    const q = query(collection(this.db, this.collectionName), ...filters)
    onSnapshot(q, (querySnapshot) => {
      const res: any[] = []
      querySnapshot.forEach((doc) => {
        res.push(this.normalizeItem(doc))
      })
      cb(res)
    })
  }

  async listenUserItems(filters: QueryConstraint[] = [], cb: CallableFunction) {
    this.listenItems([...filters], cb)
  }

  // -------------------------------------------------------------> Helpers

  showDataFrom(querySnapshot: any, collection: string) {
    const source = querySnapshot.metadata.fromCache ? 'local cache' : 'server'
    console.log(`Data came from ${source} collection ${collection}`)
  }

  transformAnyToDate = (date: unknown): Date | null => {
    if (!date) return null
    if (date instanceof Timestamp) {
      return date.toDate()
    } else if (date instanceof Date) {
      return date
    } else if (typeof date === 'number') {
      return new Date(date)
    } else if (typeof date === 'string') {
      const aux = new Date(date)
      if (Number.isNaN(aux.getTime())) {
        return null
      } else {
        return aux
      }
    } else {
      console.error('date is not valid date')
      return null
    }
  }

  validateFilters(
    filters: QueryConstraint[],
    collectionName: string
  ): QueryConstraint[] | null {
    if (!filters) {
      console.error('Should have filters implanted')
      return null
    }
    if (!Array.isArray(filters)) {
      console.error('filter is not an array', {
        collectionName
      })
      return null
    }

    //* Validate inside each filter and find if any a the values is invalid
    filters.forEach((filter) => {
      //* Looks like firebase define a function unsolved if the value of
      if (!(filter instanceof QueryConstraint))
        console.error('invalid filter', {
          filter,
          collectionName
        })
    })

    return filters
  }

  normalizeItems = (docs = []) => docs?.map((doc) => this.normalizeItem(doc))

  normalizeItem = (doc: any) => {
    const id = doc.id
    if (!doc?.exists()) {
      console.error(
        `document ${id} in collection:${this.collectionName} not found`
      )
      return null
    } // The document  not exist
    const data = doc.data()

    //* Format all fields from timestamp to date
    const res = convertTimestamps(data)

    function convertTimestamps(data: any): any {
      return Object.keys(data).reduce((acc: any, key) => {
        const value = data[key]
        if (value instanceof Timestamp) {
          acc[key] = value.toDate()
        } else if (typeof value === 'object' && value !== null) {
          acc[key] = convertTimestamps(value)
        } else {
          acc[key] = value
        }
        return acc
      }, {})
    }

    if (res) {
      return { ...res, id }
    } else {
      console.log(
        `error formatting document ${id} in collection:${this.collectionName} not found`
      )
      return null
    }
  }

  formatResponse = (
    ok: boolean,
    type: string,
    res: any
  ): {
    type: string
    ok: boolean

    res: {
      id: string
    }
  } => {
    if (!ok) {
      console.error(type, { type, res })
    }
    const formattedType = type?.toUpperCase()
    return { type: formattedType, ok, res }
  }
}

export interface UploadFileAsync {
  file: File
  fieldName: string
}
