import { HttpsError, onCall } from 'firebase-functions/https'
import { cleanPhone } from './utils/cleanPhone'
import { db } from '.'

export const createUser = onCall(
  {
    enforceAppCheck: false,
    cors: true
  },
  async (request) => {
    try {
      console.log('👤 Creando usuario nuevo...')
      console.log('📱 Request data:', request.data)

      if (!request.data?.phone || !request.data?.name) {
        throw new HttpsError(
          'invalid-argument',
          'El nombre y teléfono son requeridos'
        )
      }

      const { phone, name, email } = request.data
      const cleanedPhone = cleanPhone(phone)

      console.log('🧹 Teléfono limpio:', cleanedPhone)

      // Verificar que el usuario no exista ya
      const usersRef = db.collection('users')
      const existingUser = await usersRef
        .where('phone', '==', cleanedPhone)
        .limit(1)
        .get()

      if (!existingUser.empty) {
        throw new HttpsError(
          'already-exists',
          'Ya existe un usuario con este teléfono'
        )
      }

      // Crear el usuario
      const newUserData = {
        name: name,
        phone: cleanedPhone,
        email: email || '',
        canCreateStore: true,
        createdAt: new Date().toISOString()
      }

      const docRef = await usersRef.add(newUserData)
      console.log('✅ Usuario creado con ID:', docRef.id)

      return {
        success: true,
        userId: docRef.id,
        phone: cleanedPhone,
        name: name,
        message: 'Usuario creado exitosamente'
      }
    } catch (error) {
      console.error('❌ Error en createUser:', error)

      if (error instanceof HttpsError) {
        throw error
      }

      throw new HttpsError('internal', 'Error interno del servidor', {
        originalError: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }
)
