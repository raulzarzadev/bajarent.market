'use client'
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  componentName?: string
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo })
    console.error('Error caught by boundary:', error, errorInfo)

    // Aquí puedes enviar el error a un servicio de logging
    this.sendErrorReport(error, errorInfo)
  }

  sendErrorReport = (error: Error, errorInfo: ErrorInfo) => {
    // Implementa aquí el envío del error a tu servicio preferido
    // Por ejemplo: Sentry, LogRocket, etc.
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      componentName: this.props.componentName
    }

    console.log('Sending error report:', errorReport)
    // fetch('/api/error-report', { method: 'POST', body: JSON.stringify(errorReport) });
  }

  goBack = () => {
    window.history.back()
  }

  reload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>¡Algo salió mal!</h2>
          <p>
            Ha ocurrido un error inesperado
            {this.props.componentName && ` en el componente: ${this.props.componentName}`}. El
            equipo técnico ha sido notificado.
          </p>
          <div>
            <button type="button" onClick={this.goBack}>
              Regresar a la página anterior
            </button>
            <button type="button" onClick={this.reload}>
              Recargar página
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
