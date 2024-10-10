'use client'
import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Icon, { IconName } from './Icon'
import Button from './Button'
//import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function Modal({
  openLabel = 'Abrir modal',
  confirmLabel = 'Confirmar',
  title = 'Título',
  openDisabled = false,
  content,
  text,
  openIcon,
  openColor,
  confirmIcon,
  confirmColor,
  handleConfirm,
  children
}: {
  title: string
  openLabel?: string
  openDisabled?: boolean
  openIcon?: IconName
  openColor?: 'error' | 'success' | 'warning' | 'info'
  confirmLabel?: string
  confirmIcon?: IconName
  confirmColor?: 'error' | 'success' | 'warning' | 'info'
  content?: React.ReactNode
  text?: string
  handleConfirm?: () => Promise<boolean>
  children?: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef(null)

  return (
    <>
      <button
        disabled={openDisabled}
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-400 rounded-md hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-none disabled:opacity-40`}
      >
        {openLabel}
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
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
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {/* 
                      // Icon on left side of the title
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <Icon name="close" /> 
                      </div> */}
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {title}
                        </Dialog.Title>
                        {text && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">{text}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"'>
                      {children}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {handleConfirm && (
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        onClick={async (e) => {
                          e.preventDefault()
                          e.stopPropagation()

                          const res = await handleConfirm?.()
                          if (res) {
                            setOpen(false)
                          } else {
                            alert('Error al confirmar')
                          }
                        }}
                      >
                        {confirmLabel}
                      </button>
                    )}

                    <Button
                      label="Cerrar"
                      onClick={() => setOpen(false)}
                      variant="outline"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
