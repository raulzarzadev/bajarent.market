import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { db } from '.'
import { cleanPhone } from './utils/cleanPhone'

export const checkUserExists = onCall(
  {
    cors: true,
    invoker: 'public' // Permite invocaciones públicas
  },
  async (request) => {
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
      const firstName = userData.firstName || ''
      const lastName = userData.lastName || ''
      const fullName = `${firstName} ${lastName}`.trim() || 'Usuario'

      return {
        exists: true,
        phone: cleanedPhone,
        name: fullName,
        firstName,
        lastName,
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
  }
)
