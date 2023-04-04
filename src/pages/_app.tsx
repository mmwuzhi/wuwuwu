import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { css, Global } from '@emotion/react'
import { ClickToComponent } from 'click-to-react-component'
import dayjs from 'dayjs'
import 'nprogress/nprogress.css'
import '@/utils/setNprogress'
import 'dayjs/locale/ja'
import '@code-hike/mdx/dist/index.css'
import MantineThemeProvider from '@/components/MantineThemeProvider'

dayjs.locale('ja')

const global = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
      Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.6;
    font-size: 1rem;
    box-sizing: border-box;
  }
  a {
    color: #0070f3;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  img {
    max-width: 100%;
    display: block;
  }
  .ch-codeblock .ch-code-button {
    display: none;
  }
  .ch-codeblock:hover .ch-code-button {
    display: block;
  }
  code {
    color: #dc0f42;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    background-color: #f2f2f2;
  }
`

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    // temporarily resolve the Flash of Unstyled Content(FOUC) issue
    document.documentElement.style.opacity = '1'
  }, [])

  return (
    <>
      <Global styles={global} />
      <MantineThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydrateState}>
            <ClickToComponent />
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </Hydrate>
        </QueryClientProvider>
      </MantineThemeProvider>
    </>
  )
}

export default App
