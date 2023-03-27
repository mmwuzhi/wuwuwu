import React from 'react'
import { getMDXComponent } from 'mdx-bundler/client'

interface Props {
  mdxSource: string
}

/**
 * https://github.com/kentcdodds/mdx-bundler/issues/100
 * used to fix react hooks linting warning when using emotion and mdx-bundler
 */
export class MDXComponent extends React.Component<Props> {
  state = {
    component: getMDXComponent(this.props.mdxSource),
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.mdxSource !== this.props.mdxSource) {
      this.setState({ component: getMDXComponent(this.props.mdxSource) })
    }
  }

  render() {
    return React.createElement(this.state.component)
  }
}
