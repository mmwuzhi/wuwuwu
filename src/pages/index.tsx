import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import styled from 'styled-components'
import Date from '@/components/date'
import Layout from '@/components/layout'
import PostType from '@/types/post'
import { getSortedPostsData } from '@/utils/post'

const HeadingMd = styled.section`
  font-size: 1.2rem;
  line-height: 1.5;
  padding-top: 1px;
`
const HeadingLg = styled.h2`
  font-size: 1.5rem;
  line-height: 1.4;
  margin: 1rem 0;
`
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`
const ListItem = styled.li`
  margin: 0 0 1.25rem;
`

const Home: NextPage<Props> = ({ allPostsData }) => {
  return (
    <Layout>
      <HeadingMd>
        <HeadingLg>Blog</HeadingLg>
        <List>
          {allPostsData.map(({ id, date, title }) => (
            <ListItem key={id}>
              <Link href={`/posts/${id}`} passHref>
                {title}
              </Link>
              <small>
                <Date dateString={date} />
              </small>
            </ListItem>
          ))}
        </List>
      </HeadingMd>
    </Layout>
  )
}

export default Home

interface Props {
  allPostsData: PostType[]
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData,
    },
  }
}
