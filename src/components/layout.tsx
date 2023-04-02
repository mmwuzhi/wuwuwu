import Head from 'next/head'
import Link from 'next/link'
import styled from '@emotion/styled'
import HeaderButtonGroup from './HeaderButtonGroup'

interface LayoutProps {
  title?: string
  children: React.ReactNode
}

const LayoutDiv = styled.div`
  max-width: 50rem;
  padding: 0 1rem;
  margin: 1rem auto 6rem;
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
        <meta name="description" content="🥺" key="desc" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="og:description" content="coming soon" />
        <meta name="og:title" content={title} />
        <meta name="google" content="notranslate" key="notranslate" />
      </Head>
      <HeaderButtonGroup />
      <main>{children}</main>
      <footer>
        <BackToHome>
          <Link href="/" passHref>
            wuwuwu.cc
          </Link>
        </BackToHome>
      </footer>
    </LayoutDiv>
  )
}
