import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }
`

export const LocationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 0.5rem;
  border-radius: 6px;

  background: ${(props) => props.theme['--purple-300']};

  svg {
    fill: ${(props) => props.theme['--purple-500']};
  }

  span {
    color: ${(props) => props.theme['--purple-800']};
  }
`

export const CartLink = styled(NavLink)`
  padding: 0.5rem;
  border-radius: 6px;
  background: ${(props) => props.theme['--yellow-300']};
  position: relative;

  display: flex;
  color: ${(props) => props.theme['--yellow-800']};

  span {
    position: absolute;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    background: ${(props) => props.theme['--yellow-800']};
    color: ${(props) => props.theme['--white']};
    font-weight: bold;
    font-size: 0.75rem;

    top: calc(-50% / 2);
    right: calc(-50% / 2);
  }
`
