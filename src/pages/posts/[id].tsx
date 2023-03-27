import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import styled from '@emotion/styled'
import Layout from '@/components/layout'
import Date from '@/components/date'
import { getAllPostIds, getPostData } from '@/utils/post'
import { MDXComponent } from '@/components/MDXComponent'

const Title = styled.h1`
  font-size: 2rem;
  line-height: 1.3;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
`

interface Props {
  postData: {
    id: string
    frontmatter: {
      [key: string]: any
    }
    code: string
  }
}

const Post: NextPage<Props> = ({ postData }) => {
  return (
    <Layout title={postData.frontmatter.title}>
      <Title>{postData.frontmatter.title}</Title>
      <Date dateString={postData.frontmatter.date} />
      <MDXComponent mdxSource={postData.code} />
    </Layout>
  )
}

export default Post

interface Params extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const postData = await getPostData(params!.id)
  return {
    props: {
      postData,
    },
  }
}
