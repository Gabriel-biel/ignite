import { NavLink } from 'react-router-dom'
import { Minus, Plus, ShoppingCartSimple } from 'phosphor-react'

import { CoffeeContainer, ButtonIncrementNewCoffee } from './styles'

interface CoffeeCardProps {
  title: string
  type: string
  description: string
  price: string
  image: string
}

export function CoffeeCard({
  title,
  type,
  description,
  price,
  image,
}: CoffeeCardProps) {
  return (
    <CoffeeContainer>
      <img src={image} alt="" />
      <span>{type}</span>
      <strong>{title}</strong>
      <p>{description}</p>
      <ButtonIncrementNewCoffee>
        <span>{price}</span>
        <div>
          <button>
            <Minus size={14} weight="bold" />
          </button>
          <input type="number" />
          <button>
            <Plus size={14} weight="bold" />
          </button>
        </div>
        <NavLink to="/checkout">
          <ShoppingCartSimple size={22} weight="fill" />
        </NavLink>
      </ButtonIncrementNewCoffee>
    </CoffeeContainer>
  )
}
