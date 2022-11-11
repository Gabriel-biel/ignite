import { Button } from './Components/Button'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/theme/default'
import { GlobalStyle } from './styles/global'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button changeColor="primary" />
      <Button changeColor="secundary" />
      <Button changeColor="sucess" />
      <Button changeColor="danger" />
      <Button />

      <GlobalStyle />
    </ThemeProvider>
  )
}
