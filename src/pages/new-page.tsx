import axios from 'axios'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { dehydrate, QueryClient, useQuery } from 'react-query'

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('posts', () => axios.get('/api'))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

function NewPage() {
  const { data, isLoading, isError } = useQuery<{ hello: string }>(
    'hello',
    async () => (await axios.get<{ hello: string }>('api')).data,
    {
      initialData: { hello: 'test' },
    },
  )
  return (
    <>
      <Head>
        <title>New Page</title>
      </Head>
      {isLoading ? <div>Loading...</div> : isError ? <div>error!</div> : <div>{data?.hello}</div>}
      <h2>
        <Link href="/">Go Back Home Page</Link>
      </h2>
    </>
  )
}

export default NewPage
