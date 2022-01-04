// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Buffer>,
) {
  if (req.method === 'POST') {
    const { url }: { url: string } = req.body
    try {
      const browser = puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
      const page = await (await browser).newPage()

      await page.goto(url, { timeout: 0 })

      const screenshotBuffer = await page.screenshot()

      console.log(screenshotBuffer.toString('utf-8'))
      res
        .setHeader('Content-Type', 'image/png')
        .setHeader('Content-Length', screenshotBuffer.length)
        .status(200)
        .end(screenshotBuffer)

        await browser.close();
    } catch (e: any) {
      throw new Error(e.message)
    }
  }
}
