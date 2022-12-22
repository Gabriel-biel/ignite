import styled from 'styled-components'

export const CoffeeCardCatolog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 6px 36px;
  background: ${(props) => props.theme['base-Card']};

  width: 16rem;
  height: 19.375rem;

  img {
    width: 7.5rem;
    height: 7.5rem;

    margin-top: -1.25rem;
    margin-bottom: 0.75rem;
  }

  strong {
    font-family: 'Baloo 2';
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 130%;
    margin-bottom: 0.5rem;
  }

  > p {
    font-size: 87.5%;
    line-height: 130%;
    margin-bottom: 2rem;
    text-align: center;
    color: ${(props) => props.theme['base-Label']};
    padding: 0 1.25rem;
  }
`

export const CoffeeCardCart = styled.div`
  display: flex;
  gap: 1.25rem;
  padding: 4px 8px;
  height: 5rem;

  img {
    width: 4rem;
    height: 4rem;
  }

  p {
    color: ${(props) => props.theme['base-SubTitle']};
  }
`

export const ButtonsQuantityRemove = styled.div`
  display: flex;
  gap: 8px;
`

export const ButtonRemove = styled.button`
  display: flex;
  gap: 4px;

  border: none;
  background: ${(props) => props.theme['base-Button']};
`

export const Tag = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  span {
    background: ${(props) => props.theme['yellow-300']};

    color: ${(props) => props.theme['yellow-800']};
    font-weight: 700;
    line-height: 130%;
    font-size: 0.625rem;

    border-radius: 6.25rem;
    padding: 0.25rem 0.5rem;
    margin-bottom: 1rem;
  }
`

export const ButtonIncrementNewCoffee = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  p {
    font-size: 87.5%;
    line-height: 130%;
    text-align: center;
    color: ${(props) => props.theme['base-Label']};
  }

  span {
    background: none;
    margin-bottom: 0;
    font-family: 'Baloo 2';
    font-size: 1.5rem;
    font-weight: 800;
    color: ${(props) => props.theme['base-Text']};
  }

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;

    width: 2.375rem;
    height: 2.375rem;
    border-radius: 0.375rem;

    margin-left: 0.5rem;

    background: ${(props) => props.theme['purple-800']};
    color: ${(props) => props.theme.white};
    cursor: pointer;
  }
`
