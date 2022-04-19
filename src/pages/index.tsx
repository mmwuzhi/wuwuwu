import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>ううう</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to wuwuwu.cc</h1>
        <Link href="new-page">New Page</Link>
      </main>

      <footer>wuwuwu.cc</footer>
    </div>
  )
}

export default Home
