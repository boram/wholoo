import React from 'react'
import styled from 'styled-components'
import Wrapper from '../common/Wrapper'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
  height: 100%;
`

const LoggedOut = ({ children }) => (
  <Wrapper>
    <Container>{children}</Container>
  </Wrapper>
)

export default LoggedOut
