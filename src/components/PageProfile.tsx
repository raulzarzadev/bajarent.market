'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import { logout } from '@/firebase/auth'
import PrivatePage from '@/hocs/PrivatePage'
import Button from './Button'
import Icon from './Icon'
import FormikInputText from './FormikInputText'
import FormikInputPhone from './FormikInputPhone'
import ModalUpdateProfile from './ModalUpdateProfile'
import { Formik } from 'formik'
import { usersCRUD } from '@/firebase/auth'
import Avatar from './Avatar'

const PageProfile = () => {
  const { user, refreshUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [tempUserData, setTempUserData] = useState<any>(null)

  useEffect(() => {
    const tempDataString = localStorage.getItem('tempUserData')
    if (tempDataString && user) {
      try {
        const tempData = JSON.parse(tempDataString)
        setTempUserData(tempData)
        setShowUpdateModal(true)
      } catch (error) {
        console.error('Error parsing tempUserData:', error)
        localStorage.removeItem('tempUserData')
      }
    }
  }, [user])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const handleUpdateFromModal = async (values: any) => {
    if (!user?.id) return

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await usersCRUD.updateItem(user.id, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        updatedAt: new Date().toISOString()
      })

      // Refrescar los datos del usuario en el contexto
      await refreshUser()

      setSuccess('Perfil actualizado correctamente')
      setShowUpdateModal(false)
      localStorage.removeItem('tempUserData')

      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Error al actualizar el perfil. Inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setShowUpdateModal(false)
    localStorage.removeItem('tempUserData')
  }

  const handleUpdateProfile = async (values: any) => {
    if (!user?.id) return

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await usersCRUD.updateItem(user.id, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        updatedAt: new Date().toISOString()
      })

      // Refrescar los datos del usuario en el contexto
      await refreshUser()

      setSuccess('Perfil actualizado correctamente')
      setIsEditing(false)

      // Recargar datos del usuario
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Error al actualizar el perfil. Inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  const getFullName = (user: any) => {
    if (!user) return 'Usuario'
    const firstName = user.firstName || ''
    const lastName = user.lastName || ''
    return `${firstName} ${lastName}`.trim() || 'Sin nombre'
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Cargando perfil...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Cover */}
          <div className="h-32 bg-linear-to-r from-blue-100 to-purple-300"></div>

          {/* Profile Content */}
          <div className="px-6 pb-6">
            {/* Avatar & Basic Info */}
            <div className="flex items-start justify-between -mt-16 mb-6">
              <div className="flex items-end space-x-4">
                {/* Avatar */}
                <Avatar src={user.image} label={getFullName(user)} size="lg" />

                {/* Name & Status */}
                <div className="mt-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {getFullName(user)}
                  </h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">Cuenta activa</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 mt-4">
                <Button
                  type="button"
                  label={isEditing ? 'Cancelar' : 'Editar'}
                  variant={isEditing ? 'outline-solid' : 'solid'}
                  onClick={() => {
                    setIsEditing(!isEditing)
                    setError(null)
                    setSuccess(null)
                  }}
                />
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                <Icon icon="error" size={16} className="text-red-500" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                <Icon icon="checkCircle" size={16} className="text-green-500" />
                <span className="text-green-700 text-sm">{success}</span>
              </div>
            )}

            {/* Profile Form */}
            {isEditing ? (
              <Formik
                initialValues={{
                  firstName: user.firstName || '',
                  lastName: user.lastName || '',
                  email: user.email || '',
                  phone: user.phone || ''
                }}
                onSubmit={handleUpdateProfile}
              >
                {({ handleSubmit }) => (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormikInputText
                        name="firstName"
                        label="Nombre"
                        placeholder="Tu nombre"
                      />
                      <FormikInputText
                        name="lastName"
                        label="Apellidos"
                        placeholder="Tus apellidos"
                      />
                      <FormikInputText
                        name="email"
                        label="Correo electrónico"
                        placeholder="tu@email.com"
                        type="email"
                      />
                    </div>

                    <FormikInputPhone
                      name="phone"
                      label="Número de teléfono"
                      placeholder="+52 xxx xxx xxxx"
                    />

                    <div className="flex space-x-3 pt-4 border-t border-gray-200">
                      <Button
                        type="submit"
                        label={isLoading ? 'Guardando...' : 'Guardar cambios'}
                        variant="solid"
                        disabled={isLoading}
                        onClick={() => handleSubmit()}
                      />
                      <Button
                        type="button"
                        label="Cancelar"
                        variant="outline-solid"
                        onClick={() => setIsEditing(false)}
                      />
                    </div>
                  </div>
                )}
              </Formik>
            ) : (
              <div className="space-y-4">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="block text-sm font-medium text-gray-700 mb-1">
                        Correo electrónico
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon
                          icon="message"
                          size={16}
                          className="text-gray-400"
                        />
                        <span className="text-gray-900">
                          {user.email || 'No proporcionado'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon
                          icon="phone"
                          size={16}
                          className="text-gray-400"
                        />
                        <span className="text-gray-900">
                          {user.phone || 'No proporcionado'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="block text-sm font-medium text-gray-700 mb-1">
                        Miembro desde
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon
                          icon="calendar"
                          size={16}
                          className="text-gray-400"
                        />
                        <span className="text-gray-900">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString(
                                'es-ES',
                                {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                }
                              )
                            : 'Fecha no disponible'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de cuenta
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon
                          icon="profile"
                          size={16}
                          className="text-gray-400"
                        />
                        <span className="text-gray-900">
                          {user.canCreateStore
                            ? 'Usuario Premium'
                            : 'Usuario Básico'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions Panel */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Acciones de cuenta
          </h2>

          <div className="space-y-3">
            <Button
              type="button"
              label="Cerrar sesión"
              variant="outline-solid"
              color="error"
              onClick={handleLogout}
            />
          </div>
        </div>

        {/* Modal for updating profile with temp data */}
        {showUpdateModal && tempUserData && (
          <ModalUpdateProfile
            open={showUpdateModal}
            onClose={handleCloseModal}
            onSave={handleUpdateFromModal}
            initialValues={{
              firstName: tempUserData.firstName || user?.firstName || '',
              lastName: tempUserData.lastName || user?.lastName || '',
              email: tempUserData.email || user?.email || '',
              phone: tempUserData.phone || user?.phone || ''
            }}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  )
}

export default PrivatePage(PageProfile)
