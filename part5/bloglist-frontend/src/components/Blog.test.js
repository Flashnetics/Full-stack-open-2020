import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'

import Togglable from './Togglable'


test('renders content', () => {
  const blog = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  
  const component = render(
    <Blog blog={blog} />
  )

  const li = component.container.querySelector('li')
  
  console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the button calls event handler once', () => {
    const blog = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }
  
    const mockHandler = jest.fn()
  
    const component = render(
      <Blog blog={blog} toggleImportance={mockHandler} />
    )
  
    const button = component.getByText('make not important')
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  })
  describe('<Togglable />', () => {
    let component
  
    beforeEach(() => {
      component = render(
        <Togglable buttonLabel="show...">
          <div className="testDiv" />
        </Togglable>
      )
    })
  
    test('renders its children', () => {
      expect(
        component.container.querySelector('.testDiv')
      ).toBeDefined()
    })
  
    test('at start the children are not displayed', () => {
      const div = component.container.querySelector('.togglableContent')
  
      expect(div).toHaveStyle('display: none')
    })
  
    test('after clicking the button, children are displayed', () => {
      const button = component.getByText('show...')
      fireEvent.click(button)
  
      const div = component.container.querySelector('.togglableContent')
      expect(div).not.toHaveStyle('display: none')
    })

    test('toggled content can be closed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)
      
        const closeButton = component.getByText('cancel')
        fireEvent.click(closeButton)
      
        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
      })
  
  })