# Diagramas de Flujo de Login - BajaRent

Este documento contiene los diagramas de los diferentes flujos de autenticación que necesitamos probar en la aplicación BajaRent.

## 1. Flujo Principal de Login

```mermaid
flowchart TD
    A[Usuario accede a /login] --> B[FormSignIn carga]
    B --> C[Ingresa número de teléfono]
    C --> D{¿Número válido?}
    D -->|No| E[Mostrar error de validación]
    E --> C
    D -->|Sí| F[Llamar checkUserExists Cloud Function]
    F --> G{¿Usuario existe?}

    G -->|Sí| H[Mostrar mensaje: Usuario encontrado]
    H --> I[Enviar código SMS]
    I --> J[Mostrar formulario de código]

    G -->|No| K[Mostrar mensaje: Usuario nuevo]
    K --> L[Mostrar formulario de registro]
    L --> M[Usuario completa nombre y apellido]
    M --> N[Enviar código SMS]
    N --> J

    J --> O[Usuario ingresa código]
    O --> P{¿Código válido?}
    P -->|No| Q[Mostrar error de código]
    Q --> O
    P -->|Sí| R[Firebase Auth crea/autentica usuario]
    R --> S[authStateChanged se ejecuta]
    S --> T{¿Usuario existe en DB?}
    T -->|No| U[Crear usuario en Firestore]
    T -->|Sí| V[Cargar datos del usuario]
    U --> V
    V --> W[AuthContext actualiza estado]
    W --> X[Redireccionar a /profile]
```

## 2. Flujo de Usuario Existente

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as FormSignIn
    participant CF as Cloud Function
    participant FB as Firebase Auth
    participant FS as Firestore
    participant AC as AuthContext

    U->>F: Ingresa teléfono
    F->>CF: checkUserExists(phone)
    CF->>FS: Buscar usuario por teléfono
    FS-->>CF: Usuario encontrado
    CF-->>F: {exists: true, name: "Juan Pérez"}
    F->>F: Mostrar mensaje de bienvenida
    F->>FB: sendSignInPhone(phone)
    FB-->>F: Código enviado
    F->>F: Mostrar formulario de código
    U->>F: Ingresa código
    F->>FB: confirmationResult.confirm(code)
    FB-->>F: Usuario autenticado
    FB->>AC: authStateChanged(user)
    AC->>FS: Obtener datos del usuario
    FS-->>AC: Datos del usuario
    AC->>AC: Actualizar contexto
    AC->>U: Redireccionar a /profile
```

## 3. Flujo de Usuario Nuevo

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as FormSignIn
    participant CF as Cloud Function
    participant FB as Firebase Auth
    participant FS as Firestore
    participant AC as AuthContext

    U->>F: Ingresa teléfono
    F->>CF: checkUserExists(phone)
    CF->>FS: Buscar usuario por teléfono
    FS-->>CF: Usuario no encontrado
    CF-->>F: {exists: false}
    F->>F: Mostrar formulario de registro
    U->>F: Completa nombre y apellido
    F->>F: Guardar datos temporales en localStorage
    F->>FB: sendSignInPhone(phone)
    FB-->>F: Código enviado
    F->>F: Mostrar formulario de código
    U->>F: Ingresa código
    F->>FB: confirmationResult.confirm(code)
    FB-->>F: Usuario autenticado
    FB->>AC: authStateChanged(user)
    AC->>AC: Usuario no existe en DB
    AC->>FS: Crear usuario con datos temporales
    FS-->>AC: Usuario creado
    AC->>AC: Actualizar contexto
    AC->>U: Redireccionar a /profile
```

## 4. Flujo de Manejo de Errores

```mermaid
flowchart TD
    A[Inicio del proceso] --> B[Cualquier paso del flujo]
    B --> C{¿Ocurre error?}
    C -->|No| D[Continuar flujo normal]
    C -->|Sí| E{¿Tipo de error?}

    E -->|too-many-requests| F[Mostrar: Demasiados intentos]
    E -->|invalid-phone-number| G[Mostrar: Número inválido]
    E -->|invalid-app-credential| H[Mostrar: Error de configuración]
    E -->|invalid-verification-code| I[Mostrar: Código incorrecto]
    E -->|recaptcha-expired| J[Mostrar: reCAPTCHA expirado]
    E -->|network-error| K[Mostrar: Error de conexión]
    E -->|other| L[Mostrar: Error genérico]

    F --> M[Usuario puede reintentar después]
    G --> N[Usuario corrige número]
    H --> O[Contactar soporte]
    I --> P[Usuario reingresa código]
    J --> Q[Reinicializar reCAPTCHA]
    K --> R[Verificar conexión]
    L --> S[Reintentar o contactar soporte]
```

## 5. Flujo de Estados del AuthContext

```mermaid
stateDiagram-v2
    [*] --> Undefined : App inicia
    Undefined --> Loading : authStateChanged inicia
    Loading --> Null : No hay usuario autenticado
    Loading --> Authenticated : Usuario autenticado

    Null --> Loading : Usuario inicia login
    Authenticated --> Loading : Usuario hace logout
    Authenticated --> Authenticated : refreshUser()

    state Authenticated {
        [*] --> CheckingDB : Usuario de Firebase Auth
        CheckingDB --> CreatingUser : Usuario no existe en DB
        CheckingDB --> LoadingUserData : Usuario existe en DB
        CreatingUser --> LoadingUserData : Usuario creado
        LoadingUserData --> UserReady : Datos cargados
    }
```

## 6. Flujo de Navegación y Protección de Rutas

```mermaid
flowchart TD
    A[Usuario navega a ruta] --> B{¿Ruta protegida?}
    B -->|No| C[Mostrar contenido público]
    B -->|Sí| D[PrivatePage HOC verifica auth]
    D --> E{¿Usuario autenticado?}
    E -->|Sí| F[Mostrar contenido protegido]
    E -->|No| G[Redireccionar a /login]
    G --> H[Proceso de login]
    H --> I[Login exitoso]
    I --> J[Redireccionar a ruta original]

    state Protegidas {
        /profile
        /my-rents
        /orders
        /rent-now
    }

    state Públicas {
        /
        /login
        /privacidad
        /[shop]
    }
```

## 7. Flujo de Inicialización de la App

```mermaid
sequenceDiagram
    participant App as App
    participant Layout as RootLayout
    participant AP as AuthProvider
    participant FB as Firebase Auth
    participant FS as Firestore
    participant Nav as Navbar

    App->>Layout: Renderizar
    Layout->>AP: Inicializar AuthProvider
    AP->>FB: Configurar authStateChanged
    FB-->>AP: Estado inicial (loading)
    AP->>Nav: user = undefined (loading)
    Nav->>Nav: Mostrar estado de carga

    alt Usuario ya autenticado
        FB-->>AP: Usuario autenticado
        AP->>FS: Obtener datos del usuario
        FS-->>AP: Datos del usuario
        AP->>Nav: user = userData
        Nav->>Nav: Mostrar menú autenticado
    else Usuario no autenticado
        FB-->>AP: user = null
        AP->>Nav: user = null
        Nav->>Nav: Mostrar opción de login
    end
```

---

## Casos de Prueba a Implementar

Basándose en estos diagramas, necesitamos crear pruebas para:

1. **Pruebas Unitarias:**

   - checkUserExists Cloud Function
   - Funciones de autenticación (sendSignInPhone, onSendCode)
   - AuthContext hooks y providers
   - Validaciones de formularios

2. **Pruebas de Integración:**

   - Flujo completo de usuario existente
   - Flujo completo de usuario nuevo
   - Manejo de errores de Firebase
   - Persistencia de datos temporales

3. **Pruebas E2E:**

   - Navegación entre estados del formulario
   - Protección de rutas
   - Experiencia completa de usuario
   - Casos de error y recuperación

4. **Pruebas de Componentes:**
   - FormSignIn con diferentes estados
   - PrivatePage HOC
   - AuthContext Provider
   - Formularios individuales

¿Te gustaría que modifique alguno de estos diagramas o agregar algún flujo específico antes de proceder con la implementación de las pruebas?
