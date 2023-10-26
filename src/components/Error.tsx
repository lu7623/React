import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
    this.rerender = this.rerender.bind(this);
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  rerender() {
    this.setState({ hasError: false });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Oh no... there was an error!</h1>
          <button onClick={this.rerender}>Go back</button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
