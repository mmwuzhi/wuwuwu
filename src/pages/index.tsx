import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <h1>Welcome to wuwuwu.cc</h1>
      <Link href="/new-page" passHref>
        <a>New Page</a>
      </Link>
    </Layout>
  )
}

export default Home
