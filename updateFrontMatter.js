const fs = require('fs').promises
const dayjs = require('dayjs')
const matter = require('gray-matter')

/** Used to update the "update" field inside the frontmatter of .md and .mdx files when committing. */
const updateFrontmatter = async () => {
  const [, , ...mdFilePaths] = process.argv

  mdFilePaths.forEach(async (path) => {
    const file = matter.read(path)
    const { data: currentFrontmatter } = file

    // if (currentFrontmatter.published === true) {
    const updatedFrontmatter = {
      ...currentFrontmatter,
      update: dayjs().format('YYYY-MM-DD'),
    }
    file.data = updatedFrontmatter
    const updatedFileContent = matter.stringify(file)
    fs.writeFile(path, updatedFileContent)
    // }
  })
}

updateFrontmatter()
