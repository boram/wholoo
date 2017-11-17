import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import Input from 'common/Input'
import Button from 'common/Button'
import Errors from './Errors'

export class Form extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
  }

  handleSubmit = async (e: any) => {
    e.preventDefault()

    this.setState({ errors: [] })

    const { loginUser } = this.props
    const { email, password } = this.state

    try {
      const { data: { login: { authToken } } } = await loginUser(email, password)
      window.localStorage.setItem('authToken', authToken)
    } catch (error) {
      const errors = error.graphQLErrors.map(gqlError => (
        gqlError.message.split(':')[1].trim()
      ))
      this.setState({ errors })
    }
  }

  handleChange: (e: any) => void = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { email, password, errors } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        {errors.length > 0 && <Errors value={errors} />}
        <Input
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={this.handleChange}
        />
        <Button>Submit</Button>
      </form>
    )
  }
}

const mutation = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      authToken
      user {
        id
        email
      }
    }
  }
`

const FormWithData = graphql(
  mutation,
  {
    props: ({ mutate }) => ({
      loginUser: (email, password) => (
        mutate({
          variables: {
            email,
            password,
          },
        })
      ),
    }),
  },
)(Form)

export default FormWithData
