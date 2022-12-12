import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90rem;
  height: 100%;
  padding: 2rem 10rem 10rem;

  background: ${(props) => props.theme['background-app']};

  margin: 0 auto;
`
