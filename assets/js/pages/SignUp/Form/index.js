import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import Input from 'components/Input'
import Button from 'components/Button'

export class Form extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
  }

  handleSubmit = async (e: any) => {
    e.preventDefault()

    this.setState({ errors: {} })

    const { createUser } = this.props
    const { email, password } = this.state

    const response = await createUser(email, password)
    const payload = response.data.signup

    if (payload.errors.length) {
      const errors = payload.errors.reduce((acc, error) => {
        acc[error.key] = error.message
        return acc
      }, {})

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
        <Input
          name="email"
          placeholder="Email"
          value={email}
          errorMessage={errors.email}
          onChange={this.handleChange}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          errorMessage={errors.password}
          onChange={this.handleChange}
        />
        <Button>Submit</Button>
      </form>
    )
  }
}

const mutation = gql`
  mutation signup($email: String, $password: String) {
    signup(email: $email, password: $password) {
      errors {
        key
        message
      }
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
      createUser: (email, password) =>
        mutate({
          variables: {
            email,
            password,
          },
        }),
    }),
  },
)(Form)

export default FormWithData
