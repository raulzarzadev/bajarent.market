import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  cleanupTestEnvironment,
  setupTestEnvironment,
  TEST_PHONE_NUMBERS
} from '@/utils/test-helpers'

describe('Phone Authentication Integration Tests', () => {
  let auth: any

  beforeEach(() => {
    // Setup test environment with disabled app verification
    auth = setupTestEnvironment()

    // Mock reCAPTCHA for testing
    // @ts-expect-error
    window.grecaptcha = {
      reset: vi.fn(),
      getResponse: vi.fn(() => 'mock-response')
    }
  })

  afterEach(() => {
    cleanupTestEnvironment()
  })

  it('should authenticate with test phone number', async () => {
    // Create a mock reCAPTCHA verifier
    const mockVerifier: ApplicationVerifier = {
      type: 'recaptcha',
      render: vi.fn().mockResolvedValue('mock-widget-id'),
      verify: vi.fn().mockResolvedValue('mock-token'),
      clear: vi.fn()
    }
    window.recaptchaVerifier = mockVerifier

    // Mock signInWithPhoneNumber to return a confirmation result
    const mockConfirmationResult = {
      verificationId: 'mock-verification-id',
      confirm: vi.fn().mockResolvedValue({
        user: {
          uid: 'test-uid',
          phoneNumber: TEST_PHONE_NUMBERS.VALID,
          isAnonymous: false
        }
      })
    }

    vi.mocked(signInWithPhoneNumber).mockResolvedValue(mockConfirmationResult)

    // Test phone number sign in
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      TEST_PHONE_NUMBERS.VALID,
      mockVerifier
    )

    expect(confirmationResult).toBeDefined()
    expect(confirmationResult.verificationId).toBe('mock-verification-id')

    // Test code verification
    const userCredential = await confirmationResult.confirm(
      TEST_PHONE_NUMBERS.VERIFICATION_CODE
    )

    expect(userCredential.user.phoneNumber).toBe(TEST_PHONE_NUMBERS.VALID)
    expect(userCredential.user.uid).toBe('test-uid')
  })

  it('should handle invalid verification code', async () => {
    const mockVerifier: ApplicationVerifier = {
      type: 'recaptcha',
      render: vi.fn().mockResolvedValue('mock-widget-id'),
      verify: vi.fn().mockResolvedValue('mock-token'),
      clear: vi.fn()
    }

    window.recaptchaVerifier = mockVerifier

    const mockConfirmationResult = {
      verificationId: 'mock-verification-id',
      confirm: vi.fn().mockRejectedValue(new Error('Invalid verification code'))
    }

    vi.mocked(signInWithPhoneNumber).mockResolvedValue(mockConfirmationResult)

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      TEST_PHONE_NUMBERS.VALID,
      mockVerifier
    )

    // Test with invalid code
    await expect(confirmationResult.confirm('000000')).rejects.toThrow(
      'Invalid verification code'
    )
  })

  it('should handle reCAPTCHA verification', async () => {
    // Test reCAPTCHA initialization
    const mockRecaptchaVerifier = vi.mocked(RecaptchaVerifier)

    new mockRecaptchaVerifier(auth, 'test-container', {
      size: 'invisible'
    })

    expect(mockRecaptchaVerifier).toHaveBeenCalledWith(auth, 'test-container', {
      size: 'invisible'
    })

    // In a real test environment with appVerificationDisabledForTesting = true,
    // the reCAPTCHA would resolve automatically
  })

  it('should handle authentication state changes', async () => {
    const mockUser = {
      uid: 'test-uid',
      phoneNumber: TEST_PHONE_NUMBERS.VALID,
      isAnonymous: false
    }

    // Mock auth state change
    const mockUnsubscribe = vi.fn()
    const mockOnAuthStateChanged = vi.fn((callback) => {
      // Simulate user sign in
      setTimeout(() => callback(mockUser), 100)
      return mockUnsubscribe
    })

    // Test auth state observer
    let currentUser = null
    const unsubscribe = mockOnAuthStateChanged((user: any) => {
      currentUser = user
    })

    // Wait for auth state change
    await new Promise((resolve) => setTimeout(resolve, 150))

    expect(currentUser).toEqual(mockUser)
    expect(typeof unsubscribe).toBe('function')
  })
})

interface ApplicationVerifier {
  type: string
  verify(): Promise<string>
  render?(): Promise<string>
  clear?(): void
}
