import { NavLink } from 'react-router-dom'
import { HeaderContainer } from './styles'
import logoCoffee from '../../assets/Logo.svg'
import { ShoppingCart, MapPin } from 'phosphor-react'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoCoffee} alt="" />
      <nav>
        <NavLink to="/" title="mapPin">
          <MapPin size={22} weight="fill" />
          <span>Lábrea/AM</span>
        </NavLink>
        <NavLink to="/checkout" title="shoppingCart">
          <ShoppingCart size={22} weight="fill" />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
