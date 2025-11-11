import type { Metadata } from 'next'
import Image from 'next/image'
import FormSignIn from '@/components/FormSignIn'

export const metadata: Metadata = {
  title: 'Iniciar Sesión - BajaRent',
  description:
    'Accede a tu cuenta de BajaRent para gestionar tus reservas y alquileres.'
}

export default function Login() {
  return (
    <div className=" flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header con logo y título */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <Image
              src="/logo.svg"
              alt="BajaRent"
              width={120}
              height={120}
              className="mx-auto"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenido a BajaRentApp
          </h1>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <FormSignIn name={''} phone={''} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-500">
          <p>Al continuar, aceptas nuestros términos y condiciones</p>
          <div className="mt-2 space-x-4">
            <a
              href="/privacidad"
              className="hover:text-blue-600 transition-colors"
            >
              Privacidad
            </a>
            <span>•</span>
            <a
              href="#terminos"
              className="hover:text-blue-600 transition-colors"
            >
              Términos
            </a>
            <span>•</span>
            <a
              href="#soporte"
              className="hover:text-blue-600 transition-colors"
            >
              Soporte
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
