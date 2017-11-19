import React from 'react'
import styled from 'styled-components'
import { layout } from 'theme'
import Wrapper from '../common/Wrapper'

const Container = styled.div`
  min-width: 960px;
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 0 ${layout.verticalGutter};
`

const LoggedIn = ({ children }) => (
  <Wrapper>
    <Container>{children}</Container>
  </Wrapper>
)

export default LoggedIn
