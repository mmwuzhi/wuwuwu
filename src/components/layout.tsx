import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'

interface LayoutProps {
  title?: string
  children: React.ReactNode
}

const LayoutDiv = styled.div`
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
`
const BackToHome = styled.div`
  margin: 3rem 0 0;
`

export default function Layout({ title = 'ううう', children }: LayoutProps) {
  return (
    <LayoutDiv>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="I'm wuwuwu" />
        <meta name="twitter:card" content="summary_large_image" />{' '}
        <meta name="og:title" content={title} />
      </Head>
      <main>{children}</main>
      <footer>
        <BackToHome>
          <Link href="/" passHref>
            <a>wuwuwu.cc</a>
          </Link>
        </BackToHome>
      </footer>
    </LayoutDiv>
  )
}
