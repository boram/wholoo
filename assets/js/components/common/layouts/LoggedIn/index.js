import React from 'react'
import styled from 'styled-components'
import { colors, typography as typo } from 'theme'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${colors.black200};
  font-family: ${typo.fonts.body};
  font-size: ${typo.sizes.medium.font};
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;
  text-shadow: rgba(0, 0, 0, .01) 0 0 1px;
`

const Container = styled.div`
  min-width: 960px;
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
`

const LoggedIn = ({ children }) => (
  <Wrapper>
    <Container>{children}</Container>
  </Wrapper>
)

export default LoggedIn
