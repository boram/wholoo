import React from 'react'
import styled from 'styled-components'
import { colors } from 'theme'

const Base = styled.a`
  color: ${colors.gray200};
  &:hover {
    color: ${colors.brightCerulean200};
    cursor: pointer;
  }
`

const Link = (props) => {
  const { onClick, children } = props

  return (
    <Base onClick={onClick}>
      {children}
    </Base>
  )
}

export default Link
