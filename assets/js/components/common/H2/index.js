import styled from 'styled-components'
import { colors, typography } from 'theme'

const H2 = styled.h2`
  font-family: ${typography.fonts.header};
  font-size: ${typography.sizes.xxxlarge.font};
  font-weight: ${typography.weights.bold};
  line-height: ${typography.lineHeights.large};
  color: ${colors.bondiBlue400};
  text-transform: uppercase;
`

export default H2
