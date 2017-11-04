// @flow
import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'

class SignUpForm extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
  }

  handleSubmit = (e: any): void => {
    e.preventDefault()

    const { mutate } = this.props
    const { email, password } = this.state

    mutate({
      variables: { email, password },
    }).catch((res) => {
      const errors = res.graphQLErrors.map(error => error.message)
      this.setState({ errors })
    })
  }

  handleChange: (e: any) => void = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { email, password } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    )
  }
}

// export default SignUpForm
export default graphql(gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`)(SignUpForm)
