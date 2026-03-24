import { Component } from 'react'
import { RefreshCw } from 'lucide-react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cream-50 px-6 text-center">
          <div className="text-6xl mb-4">🍳</div>
          <h2 className="text-xl font-bold text-olive-800 mb-2">אופס, משהו השתבש</h2>
          <p className="text-cream-600 mb-6">לא נורא, זה קורה. נסו לרענן את הדף.</p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-olive-600 text-white px-6 py-3 rounded-xl font-medium"
          >
            <RefreshCw size={18} />
            רענון
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
