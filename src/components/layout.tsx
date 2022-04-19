import Head from 'next/head'
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

export default function Layout({ title = 'ううう', children }: LayoutProps) {
  return (
    <LayoutDiv>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <footer>wuwuwu.cc</footer>
    </LayoutDiv>
  )
}
