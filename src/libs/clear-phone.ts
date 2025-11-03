export const cleanPhone = (phone: string): string => {
  // Remueve todos los caracteres que NO sean dígitos
  const digitsOnly = phone.replace(/\D/g, '')

  // Si el número tiene 10 dígitos, agrega +52 (México)
  if (digitsOnly.length === 10) {
    return `52${digitsOnly}`
  }

  // Si ya tiene código de país, agrega el + si no lo tiene
  if (digitsOnly.length === 12 && !phone.startsWith('+')) {
    return `${digitsOnly}`
  }

  // Si ya tiene el formato correcto, lo retorna
  if (phone.startsWith('52') && digitsOnly.length === 12) {
    return phone
  }

  return `${digitsOnly}`
}
