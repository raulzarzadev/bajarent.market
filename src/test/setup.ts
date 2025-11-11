import '@testing-library/jest-dom'
import { afterEach, beforeEach, vi } from 'vitest'

// Extend Window interface for custom properties
declare global {
  interface Window {
    recaptchaVerifier?: any
    confirmationResult?: any
  }
}

// Mock Firebase Auth
vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth')
  return {
    ...actual,
    getAuth: vi.fn(() => ({
      currentUser: null,
      settings: {},
      languageCode: 'es'
    })),
    RecaptchaVerifier: vi.fn(() => ({
      render: vi.fn(() => Promise.resolve('mock-widget-id')),
      verify: vi.fn(() => Promise.resolve('mock-response')),
      clear: vi.fn(() => Promise.resolve())
    })),
    signInWithPhoneNumber: vi.fn(),
    onAuthStateChanged: vi.fn()
  }
})

// Mock window object
beforeEach(() => {
  // Mock window properties
  Object.defineProperty(window, 'recaptchaVerifier', {
    writable: true,
    configurable: true,
    value: undefined
  })

  Object.defineProperty(window, 'confirmationResult', {
    writable: true,
    configurable: true,
    value: undefined
  })
})

afterEach(() => {
  // Limpiar mocks después de cada prueba
  vi.clearAllMocks()

  // Reset window properties safely
  if (typeof window !== 'undefined') {
    window.recaptchaVerifier = undefined
    window.confirmationResult = undefined
  }
})
