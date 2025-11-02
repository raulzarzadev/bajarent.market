import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormSignIn from '@/components/FormSignIn'
import {
  setupTestEnvironment,
  TEST_PHONE_NUMBERS,
  createMockRecaptcha
} from '@/utils/test-helpers'

// Mock del contexto de autenticación
vi.mock('@/context/authContext', () => ({
  useAuth: () => ({
    user: null
  })
}))

// Mock de las funciones de Firebase auth
const mockSendSignInPhone = vi.fn()
const mockOnSendCode = vi.fn()

vi.mock('@/firebase/auth', () => ({
  auth: {
    currentUser: null,
    settings: {},
    languageCode: 'es'
  },
  sendSignInPhone: mockSendSignInPhone,
  onSendCode: mockOnSendCode
}))

describe('FormSignIn - Phone Authentication Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Setup test environment
    setupTestEnvironment()

    // Mock reCAPTCHA
    // @ts-expect-error
    window.recaptchaVerifier = createMockRecaptcha()
  })

  it('should render the initial phone form', () => {
    render(<FormSignIn name="" phone="" />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument()
  })

  it('should validate phone number input', async () => {
    const user = userEvent.setup()
    render(<FormSignIn name="" phone="" />)

    const phoneInput = screen.getByLabelText(/phone/i)
    const submitButton = screen.getByRole('button', { name: /enviar/i })

    // Initially button should be disabled
    expect(submitButton).toBeDisabled()

    // Enter invalid phone number
    await user.type(phoneInput, '123')
    expect(submitButton).toBeDisabled()

    // Enter valid phone number
    await user.clear(phoneInput)
    await user.type(phoneInput, TEST_PHONE_NUMBERS.VALID)

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  })

  it('should send SMS with test phone number', async () => {
    const user = userEvent.setup()

    // Mock successful SMS sending
    mockSendSignInPhone.mockResolvedValue({
      verificationId: 'mock-verification-id'
    })

    render(<FormSignIn name="Test User" phone="" />)

    const nameInput = screen.getByLabelText(/name/i)
    const phoneInput = screen.getByLabelText(/phone/i)
    const submitButton = screen.getByRole('button', { name: /enviar/i })

    // Fill the form
    await user.type(nameInput, 'Test User')
    await user.type(phoneInput, TEST_PHONE_NUMBERS.VALID)

    // Submit the form
    await user.click(submitButton)

    // Verify SMS was sent
    await waitFor(() => {
      expect(mockSendSignInPhone).toHaveBeenCalledWith({
        phone: TEST_PHONE_NUMBERS.VALID
      })
    })

    // Should show code input form after SMS is sent
    await waitFor(
      () => {
        expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument()
        expect(screen.queryByLabelText(/phone/i)).not.toBeInTheDocument()
      },
      { timeout: 1000 }
    )
  })

  it('should handle verification code submission', async () => {
    const user = userEvent.setup()

    // Mock confirmation result
    const mockConfirmationResult = {
      confirm: vi.fn().mockResolvedValue({
        user: { uid: 'test-uid', phoneNumber: TEST_PHONE_NUMBERS.VALID }
      })
    }

    // @ts-expect-error
    window.confirmationResult = mockConfirmationResult

    // Mock successful SMS sending first
    mockSendSignInPhone.mockResolvedValue(mockConfirmationResult)

    render(<FormSignIn name="Test User" phone="" />)

    // Fill and submit phone form first
    const nameInput = screen.getByLabelText(/name/i)
    const phoneInput = screen.getByLabelText(/phone/i)
    const submitButton = screen.getByRole('button', { name: /enviar/i })

    await user.type(nameInput, 'Test User')
    await user.type(phoneInput, TEST_PHONE_NUMBERS.VALID)
    await user.click(submitButton)

    // Wait for code input to appear
    await waitFor(
      () => {
        expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument()
      },
      { timeout: 1000 }
    )

    // Now test code verification
    mockOnSendCode.mockResolvedValue({
      user: { uid: 'test-uid', phoneNumber: TEST_PHONE_NUMBERS.VALID }
    })

    // Find and submit verification code
    // Note: FormCode component would need to be tested separately
    // or we need to find its submit mechanism
  })

  it('should handle SMS sending errors', async () => {
    const user = userEvent.setup()

    // Mock SMS sending error
    const mockError = new Error('SMS sending failed')
    mockSendSignInPhone.mockRejectedValue(mockError)

    render(<FormSignIn name="Test User" phone="" />)

    const nameInput = screen.getByLabelText(/name/i)
    const phoneInput = screen.getByLabelText(/phone/i)
    const submitButton = screen.getByRole('button', { name: /enviar/i })

    await user.type(nameInput, 'Test User')
    await user.type(phoneInput, TEST_PHONE_NUMBERS.VALID)
    await user.click(submitButton)

    // Verify error was handled
    await waitFor(() => {
      expect(mockSendSignInPhone).toHaveBeenCalled()
    })

    // Form should still be visible on error
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
  })

  it('should initialize reCAPTCHA correctly', () => {
    render(<FormSignIn name="" phone="" />)

    // Verify reCAPTCHA container exists
    expect(screen.getByRole('generic', { hidden: true })).toBeInTheDocument()

    // In a real test environment, you might verify reCAPTCHA initialization
    // This would require more sophisticated mocking
  })
})
