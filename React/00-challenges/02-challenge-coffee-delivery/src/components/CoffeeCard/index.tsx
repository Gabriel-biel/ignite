import { ShoppingCartSimple, Trash } from 'phosphor-react'

import {
  CoffeeCardCatolog,
  CoffeeCardCart,
  Tag,
  ButtonsQuantityRemove,
  ButtonIncrementNewCoffee,
  ButtonRemove,
} from './styles'
import { useContext, useState } from 'react'
import { formatPrice } from '../../util/format'
import { CartContext } from '../../Contexts/CartConext'
import { QuantitySelector } from '../QuantitySelector'

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
  typeCardCoffeeCatalog?: boolean
}

export function CoffeeCard({
  coffee,
  typeCardCoffeeCatalog = true,
}: CoffeeProps) {
  const [quantity, setQuantity] = useState(1)

  const { addCoffeeToCart } = useContext(CartContext)

  function handleIncrease() {
    setQuantity((state) => state + 1)
  }
  function handleDecrease() {
    setQuantity((state) => state - 1)
  }

  function addToCart() {
    const coffeeToAdd = {
      ...coffee,
      quantity,
    }
    addCoffeeToCart(coffeeToAdd)
  }

  const formatedPrice = formatPrice(coffee.price)

  return typeCardCoffeeCatalog ? (
    <CoffeeCardCatolog>
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
        <QuantitySelector
          quantity={quantity}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
        />
        <button onClick={addToCart}>
          <ShoppingCartSimple size={22} weight="fill" />
        </button>
      </ButtonIncrementNewCoffee>
    </CoffeeCardCatolog>
  ) : (
    <CoffeeCardCart>
      <img src={coffee.image} alt="" />
      <div>
        <p>{coffee.title}</p>
        <ButtonsQuantityRemove>
          <QuantitySelector
            quantity={quantity}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
          />
          <ButtonRemove>
            <Trash size={16} weight="regular" />
            <p>REMOVER</p>
          </ButtonRemove>
        </ButtonsQuantityRemove>
      </div>
      <span>R$ {coffee.price}</span>
    </CoffeeCardCart>
  )
}
