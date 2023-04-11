import { Stack } from '@mantine/core'
import React, { Component, type ErrorInfo } from 'react'
import ThreeBirdsButton from '../ThreeBirdsButton'

interface Props {
  children: React.ReactNode
}
interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  trayAgain = () => {
    this.setState({ hasError: false })
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Stack align="center">
          <h2>哎呀，出错了！</h2>
          <ThreeBirdsButton onClick={this.trayAgain}>再试一次？</ThreeBirdsButton>
        </Stack>
      )
    }

    // Return children components in case of no error
    return this.props.children
  }
}

export default ErrorBoundary
