import {
  CoffeeAmountContainer,
  CoffeeCartCardContainer,
  DetailsContainer,
  RemoveCoffeeButton,
} from './styles'
import { AddedCoffee } from '../../../../reducers/cart/reducer'
import { Minus, Plus, Trash } from 'phosphor-react'
import { formatPrice } from '../../../../utils/format'
import { CartContext } from '../../../../hooks/CartContext'
import { useContext } from 'react'

interface AddedCoffeeProps {
  addedCoffee: AddedCoffee
}

export function CoffeeCartCard({ addedCoffee }: AddedCoffeeProps) {
  const { coffee, amount } = addedCoffee
  const { decreaseCoffeeAmount, increaseCoffeeAmount, removeCoffeeFromCart } =
    useContext(CartContext)

  const priceFormated = formatPrice(coffee.price)

  function handleIncreaseCoffeeAmount() {
    increaseCoffeeAmount(coffee.id)
  }

  function handleDecreaseCoffeeAmount() {
    decreaseCoffeeAmount(coffee.id)
  }

  function handleRemoveCoffeeFromCart() {
    removeCoffeeFromCart(coffee.id)
  }

  return (
    <CoffeeCartCardContainer>
      <img src={coffee.imageUrl} alt="" />
      <DetailsContainer>
        <span>{coffee.name}</span>
        <div>
          <CoffeeAmountContainer>
            <button onClick={handleDecreaseCoffeeAmount}>
              <Minus size={16} weight={'bold'}></Minus>
            </button>
            {amount}
            <button onClick={handleIncreaseCoffeeAmount}>
              <Plus size={16} weight={'bold'} />
            </button>
          </CoffeeAmountContainer>
          <RemoveCoffeeButton onClick={handleRemoveCoffeeFromCart}>
            <Trash size={16} />
            REMOVER
          </RemoveCoffeeButton>
        </div>
      </DetailsContainer>
      <span>R$ {priceFormated}</span>
    </CoffeeCartCardContainer>
  )
}
