import { Component, type ReactNode } from 'react'
import type { ApiError } from '../../api/types'

interface Props {
  children: ReactNode
  fallback?: (error: Error | ApiError) => ReactNode
}

interface State {
  hasError: boolean
  error: Error | ApiError | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error | ApiError): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error | ApiError, errorInfo: unknown) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error)
      }
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>오류가 발생했습니다</h2>
          <p>{this.state.error.message || '알 수 없는 오류가 발생했습니다.'}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            다시 시도
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
