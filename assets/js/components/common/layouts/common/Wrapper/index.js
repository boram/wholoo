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

export default Wrapper
