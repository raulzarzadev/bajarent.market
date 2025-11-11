import { HttpsError, onCall } from 'firebase-functions/https'
import { db } from '.'
import { cleanPhone } from './utils/cleanPhone'

export const getUserPublicData = onCall(async (request) => {
  try {
    if (!request.data?.phone) {
      throw new HttpsError('invalid-argument', 'Teléfono requerido')
    }

    const { phone } = request.data
    const cleanedPhone = cleanPhone(phone)

    const usersRef = db.collection('users')
    const querySnapshot = await usersRef.where('phone', '==', cleanedPhone).limit(1).get()

    if (querySnapshot.empty) {
      throw new HttpsError('not-found', 'Usuario no encontrado')
    }

    const userData = querySnapshot.docs[0].data()
    const firstName = userData.firstName || ''
    const lastName = userData.lastName || ''
    const fullName = `${firstName} ${lastName}`.trim() || 'Usuario'

    // Solo retornar datos públicos/seguros
    return {
      name: fullName,
      firstName,
      lastName,
      phone: cleanedPhone,
      userId: querySnapshot.docs[0].id
      // Agregar otros campos públicos que necesites
    }
  } catch (error) {
    console.error('❌ Error en getUserPublicData:', error)
    throw error instanceof HttpsError ? error : new HttpsError('internal', 'Error interno')
  }
})
