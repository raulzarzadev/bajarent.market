'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Formik } from 'formik'
import { Fragment, useRef } from 'react'
import Button from './Button'
import FormikInputPhone from './FormikInputPhone'
import FormikInputText from './FormikInputText'
import Icon from './Icon'

interface ModalUpdateProfileProps {
  open: boolean
  onClose: () => void
  onSave: (values: any) => Promise<void>
  initialValues: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  isLoading: boolean
}

export default function ModalUpdateProfile({
  open,
  onClose,
  onSave,
  initialValues,
  isLoading
}: ModalUpdateProfileProps) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-6 pb-4 pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      Completar perfil
                    </Dialog.Title>
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <Icon icon="close" size={20} />
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      Se encontraron datos temporales. ¿Quieres actualizar tu perfil con esta
                      información?
                    </p>
                  </div>

                  <Formik initialValues={initialValues} onSubmit={onSave} enableReinitialize>
                    {({ handleSubmit }) => (
                      <div className="space-y-4">
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
                        </div>
                        <FormikInputText
                          name="email"
                          label="Correo electrónico"
                          placeholder="tu@email.com"
                          type="email"
                        />
                        <FormikInputPhone
                          name="phone"
                          label="Número de teléfono"
                          placeholder="+52 xxx xxx xxxx"
                        />{' '}
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-lg mt-6">
                          <Button
                            type="submit"
                            label={isLoading ? 'Guardando...' : 'Guardar'}
                            variant="solid"
                            disabled={isLoading}
                            onClick={() => handleSubmit()}
                          />
                          <button
                            type="button"
                            ref={cancelButtonRef}
                            onClick={onClose}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          >
                            Omitir
                          </button>
                        </div>
                      </div>
                    )}
                  </Formik>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
