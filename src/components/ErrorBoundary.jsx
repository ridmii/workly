import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mt-20 container mx-auto p-6 text-center text-red-500">
          Something went wrong. Please try refreshing the page or check the console for details.
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;