import React from 'react'
import { NavLink as ReactRouterNavLink } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from 'theme'

const Wrapper = styled(ReactRouterNavLink)`
  color: ${colors.gray200};
  text-decoration: none;
  &:hover {
    color: ${colors.brightCerulean200};
    cursor: pointer;
  }

  &.selected {
    color: ${colors.bondiBlue100};
  }
`

const NavLink = (props) => {
  const { url, children } = props

  return (
    <Wrapper
      to={url}
      exact
      activeClassName="selected"
    >
      {children}
    </Wrapper>
  )
}

export default NavLink
