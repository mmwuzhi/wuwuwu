import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydrateState}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
