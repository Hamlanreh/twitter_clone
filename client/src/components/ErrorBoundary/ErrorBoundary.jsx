import React from 'react';
import './ErrorBoundary.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import RotateRightIcon from '@mui/icons-material/RotateRight';

const ErrorView = ({ error, errorInfo }) => (
  <div className="errorBoundary">
    <div>
      <TwitterIcon
        sx={{
          color: 'rgb(29, 155, 240)',
          fontSize: '7rem',
          display: 'block',
          margin: '0 auto',
        }}
      />
      <h1>Something went wrong. 😟😞😡</h1>
      <details>
        {error && error.toString()}
        <br />
        {error.componentStack}
      </details>
      <a href="/home" className="errorBoundary__refreshLink">
        Refresh the page
        <RotateRightIcon
          sx={{
            fontSize: '3rem',
            marginLeft: '1rem',
          }}
        />
      </a>
    </div>
  </div>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) return <ErrorView {...{ error, errorInfo }} />;
    return this.props.children;
  }
}

export default ErrorBoundary;
