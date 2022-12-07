import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90rem;
  height: 100vh;

  background: ${(props) => props.theme['background-app']};

  margin: 0 auto;
`
