import styled from 'styled-components'

export const TitleContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  span {
    color: ${(props) => props.theme['base-SubTitle']};
  }

  p {
    font-size: 14px;
    color: ${(props) => props.theme['base-Text']};
    line-height: 160%;
  }
`
