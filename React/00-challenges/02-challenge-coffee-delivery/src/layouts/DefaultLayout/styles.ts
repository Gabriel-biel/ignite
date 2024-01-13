import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  max-width: 70rem;
  flex-direction: column;

  background: ${(props) => props.theme['--background-app']};

  margin: 0 auto;

  @media (max-width: 860px) {
    font-size: 0.75rem;
    max-width: 26.5rem;
  }
`
