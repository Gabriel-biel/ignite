import styled from 'styled-components'

export const ButtonsIncreaseDecrease = styled.div`
  display: flex;
  width: 72px;

  button {
    width: 100%;
    height: 2.375rem;
    border: none;
    background: ${(props) => props.theme['base-Button']};
    color: ${(props) => props.theme['purple-500']};
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

  p {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;

    color: ${(props) => props.theme['base-Title']};
    background: ${(props) => props.theme['base-Button']};

    &:focus {
      box-shadow: none;
    }
  }
`
