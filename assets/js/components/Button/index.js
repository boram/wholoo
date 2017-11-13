import React from 'react'
import styled from 'styled-components'
import { colors, typography as typo } from 'theme'

const Wrapper = styled.button`
  background-color: ${colors.bondiBlue400};
  height: 64px;
  padding: 0 32px;
  border-radius: 32px;
  border: none;
  font-family: ${typo.fonts.body};
  font-size: ${typo.sizes.xxxlarge.font};
  color: white;
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: ${colors.bondiBlue500};
  }
`

const Button = (props) => {
  const { children } = props

  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

export default Button
