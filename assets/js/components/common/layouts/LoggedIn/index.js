import React from 'react'
import styled from 'styled-components'
import { layout } from 'theme'
import Header from '../common/Header'
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
    <Container>
      <Header />
      <main>
        {children}
      </main>
    </Container>
  </Wrapper>
)

export default LoggedIn
