import React from 'react'
import styled from 'styled-components'
import Logo from '../Logo'

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`

const Header = () => {
  return (
    <Wrapper>
      <Logo />
    </Wrapper>
  )
}

export default Header
