import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import { remarkCodeHike } from '@code-hike/mdx'
import theme from 'shiki/themes/one-dark-pro.json'

const postsDirectory = path.join(process.cwd(), '/src/posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.mdx$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    const items: { [key: string]: string } = {
      id,
      ...matterResult.data,
    }
    // Combine the data with the id
    return items
  })
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => ({ params: { id: fileName.replace(/\.mdx$/, '') } }))
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`)
  const source = fs.readFileSync(fullPath, 'utf-8')

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe',
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild',
    )
  }

  const { frontmatter, code } = await bundleMDX({
    source,
    files: {},
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        [remarkCodeHike, { theme }],
      ]
      return options
    },
  })

  return {
    id,
    frontmatter,
    code,
  }
}
