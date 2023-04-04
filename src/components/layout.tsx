import Head from 'next/head'
import styled from '@emotion/styled'
import { AppShell } from '@mantine/core'
import Header from './Header'

interface LayoutProps {
  title?: string
  children: React.ReactNode
}

const LayoutDiv = styled.div`
  max-width: 50rem;
  padding: 0 1rem;
  margin: 1rem auto 6rem;
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
      <AppShell header={<Header />}>{children}</AppShell>
    </LayoutDiv>
  )
}
