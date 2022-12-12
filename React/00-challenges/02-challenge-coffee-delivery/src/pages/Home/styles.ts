import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-family: 'Baloo 2';
    font-size: 2rem;
    line-height: 130%;
    font-weight: 800;
    padding-bottom: 3.375rem;
  }
`

export const CoffeeList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  list-style: none;

  color: ${(props) => props.theme['base-SubTitle']};
`
