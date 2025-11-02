# 🧪 Pruebas Automatizadas para Autenticación por Teléfono

## 📋 Configuración Inicial

### 1. Configurar número de prueba en Firebase Console

1. **Ve a Firebase Console**: https://console.firebase.google.com
2. **Selecciona tu proyecto**: `bajarent-app`
3. **Navega a**: Authentication → Sign-in method
4. **Habilita Phone** si no está habilitado
5. **Expande** "Números de teléfono para la prueba"
6. **Agrega el número de prueba**:
   - **Número**: `+525543374016`
   - **Código**: `323232`
7. **Guarda** los cambios

### 2. Comandos de Testing Disponibles

```bash
# Ejecutar todas las pruebas
bun run test

# Ejecutar pruebas en modo watch
bun run test:watch

# Ejecutar solo las pruebas básicas
bunx vitest run src/test/phone-auth-basic.test.ts

# Ejecutar pruebas con interfaz gráfica
bun run test:ui

# Ejecutar pruebas con cobertura
bun run test:coverage
```

## 🎯 Tipos de Pruebas Implementadas

### 1. **Pruebas Básicas de Validación** (`phone-auth-basic.test.ts`)

- ✅ Validación de formato de número de teléfono
- ✅ Validación de formato de código de verificación
- ✅ Simulación de envío de SMS
- ✅ Simulación de verificación de código
- ✅ Flujo completo de autenticación

### 2. **Pruebas de Componentes** (`FormSignIn.test.tsx`)

- ✅ Renderizado del formulario
- ✅ Validación de entrada de datos
- ✅ Manejo de envío de formulario
- ✅ Transición entre estados del formulario

### 3. **Pruebas de Integración** (`auth-integration.test.ts`)

- ✅ Integración con Firebase Auth
- ✅ Manejo de errores
- ✅ Estados de autenticación

## 📱 Datos de Prueba

### Número de Teléfono de Prueba

```
Número: +525543374016
Código: 323232
```

### Características del Número de Prueba

- **Formato**: México (+52) + 10 dígitos
- **SMS**: No se envían SMS reales
- **Código**: Siempre funciona con `323232`
- **Cuota**: No consume límites de Firebase
- **CI/CD**: Perfect para testing automatizado

## 🔧 Configuración de Testing

### Archivos de Configuración

1. **`vitest.config.ts`**: Configuración principal de Vitest
2. **`src/test/setup.ts`**: Setup global para pruebas
3. **`src/utils/test-helpers.ts`**: Utilidades para testing

### Variables de Testing

```typescript
export const TEST_PHONE_NUMBERS = {
  VALID: '+525543374016',
  VERIFICATION_CODE: '323232'
}
```

## 🚀 Ejecutar Pruebas Específicas

### Probar Solo Validación de Formato

```bash
bunx vitest run -t "should have valid test phone number format"
```

### Probar Solo Flujo de Autenticación

```bash
bunx vitest run -t "should handle authentication flow steps"
```

### Probar Componente FormSignIn

```bash
bunx vitest run src/components/__tests__/FormSignIn.test.tsx
```

## 📊 Resultados de Pruebas Exitosas

```
✓ src/test/phone-auth-basic.test.ts (5 tests) 4ms
  ✓ 🔐 Phone Authentication Tests (5)
    ✓ ✅ should have valid test phone number format 2ms
    ✓ ✅ should have valid verification code format 0ms
    ✓ ✅ should simulate SMS sending process 0ms
    ✓ ✅ should simulate code verification process 0ms
    ✓ ✅ should handle authentication flow steps 1ms

Test Files  1 passed (1)
     Tests  5 passed (5)
```

## 🛠 Troubleshooting

### Error: "auth/invalid-app-credential"

- ✅ Asegúrate de que el número esté configurado en Firebase Console
- ✅ Verifica que `localhost` esté en dominios autorizados
- ✅ Confirma que Phone Authentication esté habilitado

### Error: reCAPTCHA

- ✅ En pruebas automatizadas, usa `appVerificationDisabledForTesting = true`
- ✅ Asegúrate de que el mock de reCAPTCHA esté configurado

### Error: Mock Issues

- ✅ Verifica que los mocks estén en `src/test/setup.ts`
- ✅ Asegúrate de que Vitest esté configurado correctamente

## 💡 Mejores Prácticas

### 1. **Testing de Componentes**

- Mock todos los servicios externos (Firebase, reCAPTCHA)
- Prueba tanto casos exitosos como de error
- Verifica estados de UI (loading, success, error)

### 2. **Testing de Integración**

- Usa números de prueba de Firebase
- Verifica flujos completos end-to-end
- Prueba manejo de errores de red

### 3. **Testing de Seguridad**

- Nunca hardcodees números reales
- Usa solo números de prueba configurados
- Verifica validación de entrada

## 🎉 Beneficios de las Pruebas Automatizadas

- ✅ **Detección temprana** de errores
- ✅ **Regresiones** evitadas en deployments
- ✅ **Confianza** en cambios de código
- ✅ **Documentación** viva del comportamiento
- ✅ **CI/CD** integration ready

## 📚 Recursos Adicionales

- [Firebase Phone Auth Docs](https://firebase.google.com/docs/auth/web/phone-auth)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library React](https://testing-library.com/docs/react-testing-library/intro/)

---

_Pruebas implementadas para el proyecto BajaRent con Next.js 16, Tailwind CSS v4 y Biome._
