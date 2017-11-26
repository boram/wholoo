import { Form } from './'
import { ApolloError } from 'apollo-client'
import Input from 'common/Input'
import Button from 'common/Button'
import Errors from './Errors'

describe('<LogIn /><Form />', () => {
  let formWrapper

  beforeEach(() => {
    formWrapper = shallow(<Form />)
  })

  describe('by default', () => {
    test('renders <form />', () => {
      const form = formWrapper.find('form')
      expect(typeof form.prop('onSubmit')).toBe('function')
    })

    test('renders an email <Input />', () => {
      const input = formWrapper.find(Input).at(0)
      expect(input.prop('name')).toEqual('email')
      expect(input.prop('placeholder')).toEqual('Email')
      expect(input.prop('value')).toEqual('')
      expect(typeof input.prop('onChange')).toBe('function')
    })

    test('renders a password <Input />', () => {
      const input = formWrapper.find(Input).at(1)
      expect(input.prop('name')).toBe('password')
      expect(input.prop('placeholder')).toBe('Password')
      expect(input.prop('type')).toBe('password')
      expect(input.prop('value')).toBe('')
      expect(typeof input.prop('onChange')).toBe('function')
    })

    test('renders <Button />', () => {
      const button = formWrapper.find(Button)
      expect(button.prop('children')).toBe('Submit')
    })
  })

  describe('when errors are present', () => {
    let errorMessages

    beforeEach(() => {
      errorMessages = ['Invalid credentials']
      formWrapper.setState({ errors: errorMessages })
    })

    test('renders <Errors />', () => {
      const errors = formWrapper.find(Errors)
      expect(errors.length).toEqual(1)
      expect(errors.prop('value')).toBe(errorMessages)
    })
  })

  describe('when the email <Input /> has a value', () => {
    let input
    const value = 'user@example.com'

    beforeEach(() => {
      input = formWrapper.find(Input).at(0)
      input.simulate(
        'change',
        { target: { name: 'email', value } }
      )
    })

    test('updates state', () => {
      expect(formWrapper.state('email')).toEqual(value)
    })
  })

  describe('when the password <Input /> has a value', () => {
    let input
    const value = 'password'

    beforeEach(() => {
      input = formWrapper.find(Input).at(1)
      input.simulate(
        'change',
        { target: { name: 'password', value } }
      )
    })

    test('updates state', () => {
      expect(formWrapper.state('password')).toEqual(value)
    })
  })

  describe('when log in succeeds', () => {
    const email = 'user@example.com'
    const password = 'password'
    const loginUser = jest.fn()
    const preventDefault = jest.fn()

    const payload = {
      data: {
        login: {
          authToken: 'authToken',
          user: {
            email,
            id: '1',
            __typename: 'User',
          },
          __typename: 'Session',
        },
      },
    }

    beforeEach(() => {
      localStorage.clear()
      loginUser.mockReturnValue(payload)

      formWrapper.setProps({ loginUser })
      formWrapper.setState({ email, password })
      formWrapper.find('form').simulate('submit', { preventDefault })
    })

    test('persists the JWT', () => {
      expect(loginUser).toHaveBeenCalledWith(email, password)
      expect(localStorage.__STORE__.authToken).toEqual('authToken')
    })
  })

  describe('when log in fails', () => {
    const errorMessage = 'Invalid credentials'
    const errorPayload = {
      graphQLErrors: [
        {
          locations: [
            { column: 0, line: 0 },
          ],
          message: `In field "login": ${errorMessage}`,
          path: ['login'],
        },
      ],
    }

    const email = 'invalidEmail'
    const password = 'invalidPassword'
    const loginUser = jest.fn(() => { throw new ApolloError(errorPayload) })
    const preventDefault = jest.fn()

    beforeEach(() => {
      formWrapper.setProps({ loginUser })
      formWrapper.setState({ email, password })
      formWrapper.find('form').simulate('submit', { preventDefault })
    })

    test('sets the error', () => {
      expect(formWrapper.state('errors')).toEqual([errorMessage])
    })
  })
})
