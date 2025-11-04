// Script para probar la funcionalidad del modal de actualización de perfil
// Ejecutar en la consola del navegador para simular datos temporales

const tempUserData = {
  name: 'Juan Pérez García',
  email: 'juan.perez@example.com',
  phone: '+52 555 123 4567'
}

localStorage.setItem('tempUserData', JSON.stringify(tempUserData))
console.log('✅ Datos temporales guardados en localStorage')
console.log('📝 Recarga la página y ve al perfil para ver el modal')
console.log('🔍 Datos guardados:', tempUserData)
