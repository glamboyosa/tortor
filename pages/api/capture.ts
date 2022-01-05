// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import chromium from 'chrome-aws-lambda'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ img: string }>,
) {
  if (req.method === 'POST') {
    console.log(req.body)
    const { url }: { url: string } = req.body
    console.log(url)
    try {
      // to load emojis
      await chromium.font('/fonts/NotoColorEmoji.ttf')

      

      const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      })

      const page = await (await browser).newPage()

      await page.goto(url, { timeout: 0 })

      const screenshotBuffer = (await page.screenshot()) as Buffer

      res.status(200).json({ img: screenshotBuffer.toString('base64') })
    } catch (e: any) {
      throw new Error(e.message)
    }
  }
}
