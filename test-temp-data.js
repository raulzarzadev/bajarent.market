// Script para probar la funcionalidad del modal de actualización de perfil
// Ejecutar en la consola del navegador para simular datos temporales

const tempUserName = 'María González Rodríguez'

localStorage.setItem('tempUserName', tempUserName)
console.log('✅ Nombre temporal guardado en localStorage')
console.log('📝 Recarga la página y ve al perfil para ver el modal')
console.log('🔍 Nombre guardado:', tempUserName)
console.log(
  '🎯 Después de guardar, el nombre debería actualizarse en la UI automáticamente'
)
