import React from 'react'
import styled from 'styled-components'
import Logo from '../Logo'
import UserMenuWithData from './UserMenu'

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`

const Header = () => (
  <Wrapper>
    <Logo />
    <UserMenuWithData />
  </Wrapper>
)

export default Header
