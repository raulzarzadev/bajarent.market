/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from 'firebase-functions'
import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// Inicializar Firebase Admin
initializeApp()
const db = getFirestore()

// Función para limpiar el teléfono (misma lógica que tu frontend)
const cleanPhone = (phone: string): string => {
  const digitsOnly = phone.replace(/\D/g, '')

  if (digitsOnly.length === 10) {
    return `+52${digitsOnly}`
  }

  if (digitsOnly.length === 12 && digitsOnly.startsWith('52')) {
    return `+${digitsOnly}`
  }

  return `+${digitsOnly}`
}

// 🎯 Cloud Function para verificar si un usuario existe
export const checkUserExists = onCall(async (request) => {
  try {
    // Validar que se envió el teléfono
    if (!request.data?.phone) {
      throw new HttpsError(
        'invalid-argument',
        'El número de teléfono es requerido'
      )
    }

    const { phone } = request.data
    const cleanedPhone = cleanPhone(phone)

    console.log('🔍 Buscando usuario con teléfono:', cleanedPhone)

    // Consultar en Firestore con permisos de administrador
    const usersRef = db.collection('users')
    const querySnapshot = await usersRef
      .where('phone', '==', cleanedPhone)
      .limit(1)
      .get()

    if (querySnapshot.empty) {
      // Usuario no existe
      return {
        exists: false,
        phone: cleanedPhone,
        message: 'Usuario no encontrado'
      }
    }

    // Usuario existe - retornar solo información pública
    const userData = querySnapshot.docs[0].data()

    return {
      exists: true,
      phone: cleanedPhone,
      name: userData.name || 'Usuario',
      userId: querySnapshot.docs[0].id,
      message: 'Usuario encontrado'
    }
  } catch (error: unknown) {
    console.error('❌ Error en checkUserExists:', error)

    // Manejar errores específicos
    if (error instanceof HttpsError) {
      throw error
    }

    throw new HttpsError('internal', 'Error interno del servidor', {
      originalError: error instanceof Error ? error.message : String(error)
    })
  }
})

// 🔐 Función adicional para obtener datos públicos del usuario
export const getUserPublicData = onCall(async (request) => {
  try {
    if (!request.data?.phone) {
      throw new HttpsError('invalid-argument', 'Teléfono requerido')
    }

    const { phone } = request.data
    const cleanedPhone = cleanPhone(phone)

    const usersRef = db.collection('users')
    const querySnapshot = await usersRef
      .where('phone', '==', cleanedPhone)
      .limit(1)
      .get()

    if (querySnapshot.empty) {
      throw new HttpsError('not-found', 'Usuario no encontrado')
    }

    const userData = querySnapshot.docs[0].data()

    // Solo retornar datos públicos/seguros
    return {
      name: userData.name || 'Usuario',
      phone: cleanedPhone,
      userId: querySnapshot.docs[0].id
      // Agregar otros campos públicos que necesites
    }
  } catch (error) {
    console.error('❌ Error en getUserPublicData:', error)
    throw error instanceof HttpsError
      ? error
      : new HttpsError('internal', 'Error interno')
  }
})

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 })

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
