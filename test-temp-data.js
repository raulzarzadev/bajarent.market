// Script para probar la funcionalidad del modal de actualización de perfil
// Ejecutar en la consola del navegador para simular datos temporales

const tempUserData = {
  firstName: 'María',
  lastName: 'González Rodríguez',
  email: 'maria.gonzalez@example.com',
  phone: '+52 555 987 6543'
}

localStorage.setItem('tempUserData', JSON.stringify(tempUserData))
console.log('✅ Datos temporales guardados en localStorage')
console.log('📝 Recarga la página y ve al perfil para ver el modal')
console.log('🔍 Datos guardados:', tempUserData)
console.log(
  '🎯 Después de guardar, el nombre debería actualizarse en la UI automáticamente'
)
console.log(
  '👤 Nombre completo será:',
  `${tempUserData.firstName} ${tempUserData.lastName}`
)
