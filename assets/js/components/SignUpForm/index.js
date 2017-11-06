// @flow
import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'

type Props = {
  createUser: any
}

type State = {
  email: string,
  password: string,
  errors: any,
}

export class SignUpForm extends Component<Props, State> {
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
        <div className="input">
          <input
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div className="input">
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <button>Submit</button>
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

const SignUpFormWithData = graphql(
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
)(SignUpForm)

export default SignUpFormWithData
