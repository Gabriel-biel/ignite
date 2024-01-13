import { CartLink, HeaderContainer, LocationContainer } from './styles'
import logoCoffee from './../../assets/Logo.svg'
import { NavLink } from 'react-router-dom'
import { MapPin, ShoppingCart } from 'phosphor-react'
import { useContext } from 'react'
import { CartContext } from '../../hooks/CartContext'

export function Header() {
  const { totalCoffeesAddedToCart } = useContext(CartContext)

  return (
    <HeaderContainer>
      <NavLink to="/">
        <img src={logoCoffee} alt="" />
      </NavLink>
      <div>
        <LocationContainer>
          <MapPin size={22} weight="fill" />
          <span>Manaus, AM</span>
        </LocationContainer>

        <CartLink to="checkout">
          <ShoppingCart size={22} weight="fill" />
          {totalCoffeesAddedToCart > 0 && (
            <span>{totalCoffeesAddedToCart}</span>
          )}
        </CartLink>
      </div>
    </HeaderContainer>
  )
}
