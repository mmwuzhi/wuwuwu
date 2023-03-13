/** obtain the value of an object */
type ValueOf<T extends GenericObject> = T[keyof T]
/** obtain the elements of an array */
type ArrayType<T extends unknown[]> = T[number]
/** frontmatter for .mdx files */
interface MDXFrontMatter {
  title: string
  date: string
  update: string
}

declare module '*.mdx'
