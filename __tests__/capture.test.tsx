import 'whatwg-fetch'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Capture from '@/pages/capture'

const buildScreenshotForm = () => {
  const validUrls = [
    'https://google.com',
    'https://vercel.com',
    'https://instagram.com',
  ]

  const randomUrl = validUrls[Math.floor(validUrls.length * Math.random())]

  return {
    url: randomUrl,
  }
}

const server = setupServer(
  rest.post('/api/capture', async (req, res, ctx) => {
    return res(
      ctx.json({ img: Buffer.from('mysillybufferstring').toString('base64') }),
    )
  }),
)

beforeAll(() => server.listen())
afterAll(() => server.close())

test('submitting a url results in a screenshot being displayed', async () => {
  render(<Capture />)

  const { url } = buildScreenshotForm()

  userEvent.type(screen.getByPlaceholderText(/enter a valid web url/i), url)

  userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitForElementToBeRemoved(() =>
    screen.getByAltText(/some cute dancing bears/i),
  )

  expect(screen.getByAltText(/your image/i)).toMatchSnapshot()
})
