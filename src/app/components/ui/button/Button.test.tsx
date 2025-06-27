import { render, screen, fireEvent } from '@testing-library/react'
import Button from './button'

describe('Button', () => {
  it('should render the text', () => {
    render(<Button onClick={() => {}}>Clique aqui</Button>)
    expect(screen.getByText('Clique aqui')).toBeInTheDocument()
  })

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Clique</Button>)

    fireEvent.click(screen.getByText('Clique'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
