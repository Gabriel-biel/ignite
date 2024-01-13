import styled from 'styled-components'

export const CoffeeCartCardContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${(props) => props.theme['--base-Button']};

  img {
    width: 4rem;
    height: 4rem;
  }

  & > span {
    flex: 1;
    text-align: right;
    font-weight: bold;
  }
`

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span {
    color: ${(props) => props.theme['--base-Subtitle']};
    font-size: 1rem;
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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

  color: ${(props) => props.theme['--base-Subtitle']};
  background: ${(props) => props.theme['--base-Button']};
  font-size: 1rem;

  button {
    color: ${(props) => props.theme['--purple-500']};

    &:hover {
      color: ${(props) => props.theme['--purple-800']};
    }
  }
`

export const RemoveCoffeeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 6px;
  font-size: 0.75rem;

  padding: 0.5rem;
  background: ${(props) => props.theme['--base-Button']};

  svg {
    color: ${(props) => props.theme['--purple-500']};
  }
`
