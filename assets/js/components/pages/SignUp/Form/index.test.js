import { Form } from './'
import Input from 'common/Input'
import Button from 'common/Button'

describe('<SignUp /><Form />', () => {
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
      expect(input.prop('errorMessage')).toBe(undefined)
      expect(typeof input.prop('onChange')).toBe('function')
    })

    test('renders a password <Input />', () => {
      const input = formWrapper.find(Input).at(1)
      expect(input.prop('name')).toBe('password')
      expect(input.prop('placeholder')).toBe('Password')
      expect(input.prop('type')).toBe('password')
      expect(input.prop('value')).toBe('')
      expect(input.prop('errorMessage')).toBe(undefined)
      expect(typeof input.prop('onChange')).toBe('function')
    })

    test('renders <Button />', () => {
      const button = formWrapper.find(Button)
      expect(button.prop('children')).toBe('Submit')
    })
  })

  describe('when the email <Input /> has an error', () => {
    const errorMessage = "can't be blank"

    beforeEach(() => {
      formWrapper.setState({ errors: { email: errorMessage } })
    })

    test('passes the error message to <Input />', () => {
      const input = formWrapper.find(Input).at(0)
      expect(input.prop('errorMessage')).toEqual(errorMessage)
    })
  })

  describe('when the password <Input /> has an error', () => {
    const errorMessage = "can't be blank"

    beforeEach(() => {
      formWrapper.setState({ errors: { password: errorMessage } })
    })

    test('passes the error message to <Input />', () => {
      const input = formWrapper.find(Input).at(1)
      expect(input.prop('errorMessage')).toEqual(errorMessage)
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

  describe('when sign up succeeds', () => {
    const email = 'user@example.com'
    const password = 'password'
    const createUser = jest.fn()
    const preventDefault = jest.fn()

    const payload = {
      data: {
        signup: {
          user: {
            email,
            id: '1',
            __typename: 'User',
          },
          errors: null,
          __typename: 'UserResult',
        },
      },
    }

    beforeEach(() => {
      createUser.mockReturnValue(payload)
      formWrapper.setProps({ createUser })
      formWrapper.setState({ email, password })
      formWrapper.find('form').simulate('submit', { preventDefault })
    })

    test('resets state', () => {
      expect(createUser).toHaveBeenCalledWith(email, password)
      expect(formWrapper.state('email')).toBe('')
      expect(formWrapper.state('password')).toBe('')
      expect(formWrapper.state('errors')).toEqual({})
    })
  })

  describe('when sign up fails', () => {
    const payload = {
      data: {
        signup: {
          user: null,
          errors: [
            {
              message: 'can\'t be blank',
              key: 'email',
              __typename: 'InputError',
            },
            {
              message: 'can\'t be blank',
              key: 'password',
              __typename: 'InputError',
            },
          ],
          __typename: 'UserResult',
        },
      },
    }

    const email = ''
    const password = ''
    const createUser = jest.fn()
    const preventDefault = jest.fn()

    beforeEach(() => {
      createUser.mockReturnValue(payload)
      formWrapper.setProps({ createUser })
      formWrapper.setState({ email, password })
      formWrapper.find('form').simulate('submit', { preventDefault })
    })

    test('sets the errors', () => {
      expect(createUser).toHaveBeenCalledWith(email, password)
      expect(formWrapper.state('errors')).toEqual({
        email: 'can\'t be blank',
        password: 'can\'t be blank',
      })
    })
  })
})
