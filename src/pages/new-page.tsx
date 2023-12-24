import axios from 'axios'
import Layout from '@/components/layout'
import { Button, Input } from '@mantine/core'
import { useState } from 'react'

function NewPage() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const handleClick = async () => {
    const data = (await axios.post<{ shortUrl: string }>('/api/hello', { url: '12aaa3' })).data
    setShortUrl(data.shortUrl)
  }

  return (
    <Layout title="New Page">
      <Input.Wrapper>
        <div>url: </div>
        <Input
          placeholder="input url"
          value={url}
          onChange={(event) => setUrl(event.currentTarget.value)}
          mt="md"
        />
        <Button onClick={handleClick}>submit</Button>
      </Input.Wrapper>
      {!!shortUrl && (
        <>
          short url:
          <a href={shortUrl}>
            <div>{shortUrl}</div>
          </a>
        </>
      )}
    </Layout>
  )
}

export default NewPage
