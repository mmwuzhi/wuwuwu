import axios from 'axios'
import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import Layout from '@/components/layout'

export const getServerSideProps: GetServerSideProps = async (context) => {
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
    async () => (await axios.get<{ hello: string }>('/api')).data,
    {
      initialData: { hello: 'test' },
    },
  )

  return (
    <Layout title="New Page">
      {isLoading ? <div>Loading...</div> : isError ? <div>error!</div> : <div>{data?.hello}</div>}
    </Layout>
  )
}

export default NewPage
