import { NavLink } from 'react-router-dom'
import { Minus, Plus, ShoppingCartSimple } from 'phosphor-react'

import { CoffeeContainer, ButtonIncrementNewCoffee } from './styles'
import tradicional from '../../assets/coffeeImages/tradicional.svg'

interface CoffeeCardProps {
  title: string
  type: string
  description: string
  price: number
}

export function CoffeeCard({
  title,
  type,
  description,
  price,
}: CoffeeCardProps) {
  return (
    <CoffeeContainer>
      <img src={tradicional} alt="" />
      <span>TRADICIONAL</span>
      <strong>Expresso Tradicional</strong>
      <p>
        O tradicional café feito com água <br /> quente e grãos moídos
      </p>
      <ButtonIncrementNewCoffee>
        <span>9,99 </span>
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
