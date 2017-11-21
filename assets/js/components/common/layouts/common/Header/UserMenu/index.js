import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import styled from 'styled-components'
import Link from 'common/Link'
import NavLink from 'common/NavLink'

const Wrapper = styled.div`
  > * {
    display: inline-block;
    margin-right: 20px;
  }
`

export class UserMenu extends Component {
  handleLogout = () => {
    window.localStorage.removeItem('authToken')
    window.location.reload()
  }

  render() {
    const { data: { currentUser } } = this.props

    if (currentUser) {
      return (
        <Wrapper>
          <NavLink url="/dashboard">
            Dashboard
          </NavLink>
          <Link onClick={this.handleLogout}>
            Log out
          </Link>
        </Wrapper>
      )
    }

    return (
      <Wrapper>
        <NavLink url="/login">
          Log in
        </NavLink>
      </Wrapper>
    )
  }
}

const query = gql`
  query currentUserForHeader {
    currentUser {
      id
      email
    }
  }
`

export default graphql(query)(UserMenu)
