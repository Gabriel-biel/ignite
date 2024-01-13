import styled from 'styled-components'

export const CoffeeCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${(props) => props.theme['--base-Card']};
  border-radius: 6px 36px;

  min-width: 16rem;
  padding: 1.25rem 1.5rem;

  img {
    margin: -2.5rem 0 0.75rem;
  }

  & > strong {
    font-family: 'Baloo 2';
    color: ${(props) => props.theme['--base-subtitle']};
    line-height: 1.3;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  & > span {
    color: ${(props) => props.theme['--base-Label']};
    line-height: 1.3;
    font-size: 0.875rem;
    margin-bottom: 2rem;
    text-align: center;
  }
`

export const CoffeeTagContainer = styled.div`
  display: flex;
  gap: 4px;
`

export const CoffeeTag = styled.span`
  font-size: 0.625rem;
  font-weight: 600;
  color: ${(props) => props.theme['--yellow-800']};
  border-radius: 100px;
  margin-bottom: 1rem;
  padding: 0.25rem 0.5rem;
  background: ${(props) => props.theme['--yellow-300']};
`

export const CoffeeCardFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  & > span {
    font-family: 'Baloo 2';
    font-weight: 800;
    font-size: 1.5rem;
  }
`

export const CoffeeAmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  height: 2.25rem;

  padding: 0.5rem;
  border-radius: 6px;

  color: ${(props) => props.theme['--base-Title']};
  background: ${(props) => props.theme['--base-Button']};
  font-size: 1rem;

  button {
    color: ${(props) => props.theme['--purple-500']};
  }

  &:hover {
    color: ${(props) => props.theme['--purple-800']};
  }
`

export const AddToCartButton = styled.button`
  padding: 0.5rem;
  height: 2.25rem;
  background: ${(props) => props.theme['--purple-800']};
  color: ${(props) => props.theme['--base-Card']};
  border-radius: 6px;

  &:hover {
    background: ${(props) => props.theme['--purple-500']};
  }
`
