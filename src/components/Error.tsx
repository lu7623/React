import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: null,
    };
    this.rerender = this.rerender.bind(this);
  }

  public static getDerivedStateFromError(): State {
    return { error: new Error() };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ error: error });
  }

  rerender() {
    this.setState({ error: null });
  }

  public render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Oh no... there was an error!</h1>
          <p>{this.state.error.message}</p>
          <button onClick={this.rerender}>Go back</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
