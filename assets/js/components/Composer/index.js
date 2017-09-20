import React from 'react'
import styled from 'styled-components'
import { colors } from '../../theme'


const Body = styled.div`
  background-color: ${colors.mint};
  color: ${colors.orange};
`

const Composer = () => (
  <Body>
    <h1>This is the Composer</h1>
  </Body>
)

export default Composer
