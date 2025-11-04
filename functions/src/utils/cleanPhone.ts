// Función para limpiar el teléfono (misma lógica que tu frontend)
export const cleanPhone = (phone: string): string => {
  const digitsOnly = phone.replace(/\D/g, '')

  if (digitsOnly.length === 10) {
    return `+52${digitsOnly}`
  }

  if (digitsOnly.length === 12 && digitsOnly.startsWith('52')) {
    return `+${digitsOnly}`
  }

  return `+${digitsOnly}`
}
