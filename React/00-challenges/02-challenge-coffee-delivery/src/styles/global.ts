import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${(props) => props.theme['background-app']};
    color : ${(props) => props.theme['base-Text']};
    -webkit-font-smoohing: antialiased;
  }

  body, input, text-area, button {
    font-family: 'Roboto', 'Baloo 2', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }
`
