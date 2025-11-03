import { Metadata } from 'next'
import Image from 'next/image'
import FormSignIn from '@/components/FormSignIn'

export const metadata: Metadata = {
  title: 'Iniciar Sesión - BajaRent',
  description:
    'Accede a tu cuenta de BajaRent para gestionar tus reservas y alquileres.'
}

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header con logo y título */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <Image
              src="/logo.svg"
              alt="BajaRent"
              width={80}
              height={80}
              className="mx-auto"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenido a BajaRent
          </h1>
          <p className="text-gray-600 text-sm">
            Ingresa tu número de teléfono para continuar
          </p>
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
            <a href="#" className="hover:text-blue-600 transition-colors">
              Términos
            </a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Soporte
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
