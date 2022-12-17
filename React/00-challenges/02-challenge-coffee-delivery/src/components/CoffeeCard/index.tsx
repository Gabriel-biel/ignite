import { Minus, Plus, ShoppingCartSimple } from 'phosphor-react'

import {
  CoffeeContainer,
  Tag,
  ButtonsIncreaseDecrease,
  ButtonIncrementNewCoffee,
} from './styles'
import { useContext, useState } from 'react'
import { formatPrice } from '../../util/format'
import { CartContext } from '../../Contexts/CartConext'

interface CoffeeCardProps {
  id: string
  title: string
  tags: string[]
  description: string
  price: number
  image: string
}

interface CoffeeProps {
  coffee: CoffeeCardProps
  typeCardCoffee: 'cardHome' | 'cardCheckout'
}

export function CoffeeCard({ coffee }: CoffeeProps) {
  const [quantity, setQuantity] = useState(1)

  function handleIncrease() {
    setQuantity((state) => state + 1)
  }
  function handleDecrease() {
    setQuantity((state) => state - 1)
  }

  const { addCoffeeToCart } = useContext(CartContext)

  function addToCart() {
    const coffeeToAdd = {
      ...coffee,
      quantity,
    }
    addCoffeeToCart(coffeeToAdd)
  }

  const formatedPrice = formatPrice(coffee.price)
  return (
    <CoffeeContainer>
      <img src={coffee.image} alt="" />
      <Tag>
        {coffee.tags.map((tag) => {
          return <span key={`${coffee.id} ${tag}`}>{tag}</span>
        })}
      </Tag>
      <strong>{coffee.title}</strong>
      <p>{coffee.description}</p>
      <ButtonIncrementNewCoffee>
        <p>R$ </p>
        <span>{formatedPrice}</span>
        <ButtonsIncreaseDecrease>
          <button disabled={quantity <= 1} onClick={handleDecrease}>
            <Minus size={14} weight="bold" />
          </button>
          <input
            type="number"
            value={quantity}
            readOnly={true}
            min={1}
            max={10}
          />
          <button onClick={handleIncrease}>
            <Plus size={14} weight="bold" />
          </button>
        </ButtonsIncreaseDecrease>
        <button onClick={addToCart}>
          <ShoppingCartSimple size={22} weight="fill" />
        </button>
      </ButtonIncrementNewCoffee>
    </CoffeeContainer>
  )
}
