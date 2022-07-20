// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import contentful from 'contentful'

type Data = any[];

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "e3nl23945506",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "V2WjOEdi9Qg2eLSUfhiyR0hGySYvlRsPnfGHOFSH3Ys"
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const programs = await client
      .getEntries();

  console.log(programs.items)
  
  res.status(200).json(programs.items)
}
