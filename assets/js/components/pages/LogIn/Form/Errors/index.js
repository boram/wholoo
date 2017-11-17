import React from 'react'
import styled from 'styled-components'
import { colors, typography } from 'theme'

const Ul = styled.ul`
  list-style-type: none;
  margin: 20px 0;
  padding: 0;
  font-size: ${typography.sizes.large.font};
  color: ${colors.coralRed400};
`

const Li = styled.li`
  margin: 5px 0;
`

const Errors = ({ value }) => (
  <Ul>
    {value.map(message => (
      <Li key={message}>{message}</Li>
    ))}
  </Ul>
)

export default Errors
