import { useContext, useState } from 'react'
import {
  AddToCartButton,
  CoffeeAmountContainer,
  CoffeeCardContainer,
  CoffeeCardFooter,
  CoffeeTag,
  CoffeeTagContainer,
} from './styles'
import { Minus, Plus, ShoppingCart } from 'phosphor-react'
import { Coffee } from '../../../../server/coffee'
import { formatPrice } from '../../../../utils/format'
import { CartContext } from '../../../../hooks/CartContext'

interface CoffeeCardProps {
  coffee: Coffee
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const [amount, setAmount] = useState(1)
  const { addCoffeeToCart } = useContext(CartContext)

  function increaseCoffeeAmount() {
    setAmount((state) => state + 1)
  }

  function decreaseCoffeeAmount() {
    if (amount <= 1) {
      return
    }

    setAmount((state) => state - 1)
  }

  function handleAddCoffeeToCart() {
    addCoffeeToCart(coffee, amount)
  }

  const { name, description, tags, imageUrl } = coffee
  const price = formatPrice(coffee.price)

  return (
    <CoffeeCardContainer>
      <img src={imageUrl} alt="" />
      <CoffeeTagContainer>
        {tags.map((tag) => (
          <CoffeeTag key={tag}>{tag}</CoffeeTag>
        ))}
      </CoffeeTagContainer>
      <strong>{name}</strong>
      <span>{description}</span>
      <CoffeeCardFooter>
        <span>{price}</span>
        <div>
          <CoffeeAmountContainer>
            <button onClick={decreaseCoffeeAmount}>
              <Minus size={14} weight="bold" />
            </button>
            {amount}
            <button onClick={increaseCoffeeAmount}>
              <Plus size={14} weight="bold" />
            </button>
          </CoffeeAmountContainer>
          <AddToCartButton onClick={handleAddCoffeeToCart}>
            <ShoppingCart size={22} weight="fill" />
          </AddToCartButton>
        </div>
      </CoffeeCardFooter>
    </CoffeeCardContainer>
  )
}
