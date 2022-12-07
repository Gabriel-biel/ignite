import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 2rem 10rem;

  nav {
    display: flex;
    gap: 0.75rem;
    width: 12rem;
    justify-content: center;
    align-items: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 2.375rem;
      border-radius: 0.375rem;

      background: ${(props) => props.theme['purple-300']};
      color: ${(props) => props.theme['purple-800']};
      text-decoration: none;

      gap: 0.25rem;
      font-size: 87.5%;
    }

    a + a {
      max-width: 2.375rem;
      background: ${(props) => props.theme['yellow-300']};
      color: ${(props) => props.theme['yellow-500']};
    }
  }
`
