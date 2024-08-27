import React from 'react'

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      <h1>Políticas de Privacidad</h1>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Políticas de Privacidad</h2>
        <p className="mb-4">
          En nuestra página web, nos comprometemos a proteger la privacidad de
          nuestros usuarios. A continuación, se detallan nuestras políticas de
          privacidad básicas:
        </p>

        <h3 className="text-xl font-semibold mb-2">
          1. Información que Recopilamos
        </h3>
        <p className="mb-4">
          Recopilamos la siguiente información personal de nuestros usuarios:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Nombre completo</li>
          <li>Dirección de correo electrónico</li>
          <li>Número de teléfono</li>
          <li>Dirección de envío</li>
          <li>Información de pago</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">2. Uso de la Información</h3>
        <p className="mb-4">
          Utilizamos la información recopilada para los siguientes propósitos:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Procesar y gestionar pedidos y rentas</li>
          <li>Enviar confirmaciones de pedidos y rentas</li>
          <li>Proporcionar soporte al cliente</li>
          <li>Enviar actualizaciones y promociones</li>
          <li>Mejorar nuestros servicios y la experiencia del usuario</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">3. Número de Teléfono</h3>
        <p className="mb-4">
          Para realizar una renta o iniciar sesión en nuestra página web, es
          necesario proporcionar un número de teléfono válido. Utilizaremos este
          número para:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Enviar mensajes de confirmación de pedidos y rentas</li>
          <li>Enviar mensajes de cobranza vía WhatsApp</li>
          <li>Proporcionar soporte al cliente a través de WhatsApp</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          4. Compartición de Información
        </h3>
        <p className="mb-4">
          No compartimos la información personal de nuestros usuarios con
          terceros, excepto en los siguientes casos:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Cuando sea necesario para procesar y gestionar pedidos y rentas
          </li>
          <li>Cuando sea requerido por la ley</li>
          <li>Para proteger nuestros derechos y propiedades</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          5. Seguridad de la Información
        </h3>
        <p className="mb-4">
          Implementamos medidas de seguridad adecuadas para proteger la
          información personal de nuestros usuarios contra el acceso no
          autorizado, la alteración, la divulgación o la destrucción.
        </p>

        <h3 className="text-xl font-semibold mb-2">6. Derechos del Usuario</h3>
        <p className="mb-4">
          Los usuarios tienen derecho a acceder, corregir y eliminar su
          información personal. Para ejercer estos derechos, pueden ponerse en
          contacto con nosotros a través de los medios proporcionados en nuestra
          página web.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          7. Cambios en las Políticas de Privacidad
        </h3>
        <p className="mb-4">
          Nos reservamos el derecho de actualizar nuestras políticas de
          privacidad en cualquier momento. Notificaremos a nuestros usuarios
          sobre cualquier cambio significativo a través de nuestra página web o
          por correo electrónico.
        </p>

        <h3 className="text-xl font-semibold mb-2">8. Contacto</h3>
        <p>
          Si tienes alguna pregunta o inquietud sobre nuestras políticas de
          privacidad, no dudes en ponerte en contacto con nosotros a través de
          los medios proporcionados en nuestra página web.
        </p>
        <div className="flex items-center mt-8">
          <a
            href="mailto:bajarentapp@gmail.com"
            className="flex items-center mr-4"
          >
            <span> ✉️ bajarentapp@gmail.com</span>
          </a>
          <a href="https://wa.me/526121973897" className="flex items-center">
            <span>💬 +526121973897</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
