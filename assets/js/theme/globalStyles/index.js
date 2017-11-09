import { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'

injectGlobal`
  @font-face {
    font-family: 'Lato Bold';
    src: url('/fonts/Lato-Bold.ttf') format('truetype');
    font-style: normal;
  }

  @font-face {
    font-family: 'Quattrocento Sans Regular';
    src: url('/fonts/QuattrocentoSans-Regular.ttf') format('truetype');
    font-style: normal;
  }

  ${styledNormalize}

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  html, body, #app-root {
    height: 100%;
  }
`
