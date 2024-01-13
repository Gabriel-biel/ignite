import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: ${(props) => props.theme.white};
    color : ${(props) => props.theme['--base-Text']};
    -webkit-font-smoohing: antialiased;
  }

  body, input, text-area, button {
    font-family: 'Roboto', 'Baloo 2', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  button {
    cursor: pointer;
  }

  input, button {
    border: 0;
    background: none;
  }

  a { 
    text-decoration: none;
  }
`
