// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import base62 from 'base62'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Body {
  url: string
}
interface Data {
  shortUrl: string
}

function generateRandomStr(len: number) {
  let str = ''
  for (let i = 0; i < len; i++) {
    const num = Math.floor(Math.random() * 62)
    str += base62.encode(num)
  }
  return str
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const body = req.body as Body
  switch (req.method) {
    case 'POST': {
      res.status(200).json({ shortUrl: `https://mnm.lol/${generateRandomStr(6)}` })
    }
  }
}
