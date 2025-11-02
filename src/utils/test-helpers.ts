import { getAuth } from 'firebase/auth'
import { app } from '@/firebase/main'

// Configuración para pruebas automatizadas
export const setupTestEnvironment = () => {
  const auth = getAuth(app)

  // Deshabilitar verificación de app para pruebas
  // @ts-expect-error - Firebase testing API
  auth.settings = auth.settings || {}
  // @ts-expect-error - Firebase testing API
  auth.settings.appVerificationDisabledForTesting = true

  return auth
}

// Números de prueba configurados
export const TEST_PHONE_NUMBERS = {
  VALID: '+525543374020',
  VERIFICATION_CODE: '323232'
}

// Mock del reCAPTCHA para pruebas
export const createMockRecaptcha = () => {
  return {
    render: () => Promise.resolve('mock-widget-id'),
    verify: () => Promise.resolve('mock-recaptcha-response'),
    clear: () => Promise.resolve(),
    getResponse: () => 'mock-response'
  }
}

// Limpiar el entorno de pruebas
export const cleanupTestEnvironment = () => {
  if (typeof window !== 'undefined') {
    // @ts-expect-error
    window.recaptchaVerifier = undefined
    // @ts-expect-error
    window.confirmationResult = undefined
  }
}
