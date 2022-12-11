import styled from 'styled-components'

export const CoffeeContainer = styled.div`
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

  img + span {
    background: ${(props) => props.theme['yellow-300']};

    color: ${(props) => props.theme['yellow-800']};
    font-weight: 700;
    line-height: 130%;
    font-size: 0.625rem;

    border-radius: 6.25rem;
    padding: 0.25rem 0.5rem;
    margin-bottom: 1rem;
  }

  strong {
    font-family: 'Baloo 2';
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 130%;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 87.5%;
    line-height: 130%;
    margin-bottom: 2rem;
    text-align: center;
    color: ${(props) => props.theme['base-Label']};
  }
`

export const ButtonIncrementNewCoffee = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  span {
    background: none;
    font-family: 'Baloo 2';
    font-size: 1.5rem;
    font-weight: 800;
    color: ${(props) => props.theme['base-Text']};
  }

  div {
    display: flex;
    width: 72px;

    margin-left: 2rem;

    button {
      width: 100%;
      height: 2.375rem;
      border: none;
      background: ${(props) => props.theme['base-Button']};
      color: ${(props) => props.theme['purple-800']};
      cursor: pointer;
    }

    button:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    button:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    input {
      width: 1.25rem;
      text-align: center;
      border: none;
      background: ${(props) => props.theme['base-Button']};
    }
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 2.375rem;
    height: 2.375rem;
    border-radius: 0.375rem;

    margin-left: 0.5rem;

    background: ${(props) => props.theme['purple-800']};
    color: ${(props) => props.theme.white};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`
