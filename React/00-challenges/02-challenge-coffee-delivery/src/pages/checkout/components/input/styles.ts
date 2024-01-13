import styled from 'styled-components'

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid ${(props) => props.theme['--base-Button']};
  padding: 0.75rem;
  border-radius: 4px;
  gap: 4px;

  background: ${(props) => props.theme['--base-Input']};

  input {
    flex: 1;
    color: ${(props) => props.theme['--base-Text']};

    &::placeholder {
      color: ${(props) => props.theme['--base-Label']};
      font-size: 0.75rem;
    }
  }

  span {
    font-size: 0.75rem;
    font-style: italic;
    color: ${(props) => props.theme['--base-Label']};
  }
`
