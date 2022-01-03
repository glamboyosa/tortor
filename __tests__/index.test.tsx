import { render, screen } from '@testing-library/react'

import Home from '@/pages/index'

test('Home screen is rendered correctly', () => {
  render(<Home />)

  const heading = screen.getByRole('heading', {
    name: /tortor/i,
  })

  expect(heading).toBeInTheDocument()
})
