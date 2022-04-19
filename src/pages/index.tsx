import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

const Home: NextPage = () => {
  return (
    <Layout>
        <h1>Welcome to wuwuwu.cc</h1>
        <Link href="new-page">New Page</Link>
    </Layout>
  )
}

export default Home
