import { createContext, ReactNode, useReducer } from 'react'
import { addNewCoffeToCartAction } from '../Reducers/Coffee/actions'
import { Coffee, CoffeeReducer } from '../Reducers/Coffee/reducer'

interface CartItem extends Coffee {
  quantity: number
}

interface CartContextType {
  cafes: CartItem[]
  addCoffeeToCart: (data: CartItem) => void
  cartQuantity: number
}

interface CoffeeProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CoffeeProviderProps) {
  const [CoffeeState, dispatch] = useReducer(
    CoffeeReducer,
    {
      cafes: [],
      coffeesInCart: [],
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-coffee:coffees-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return {
        cafes: [],
        coffeesInCart: [],
      }
    },
  )

  const { cafes, coffeesInCart } = CoffeeState
  const cartQuantity = coffeesInCart.length

  console.log(cafes)
  // console.log(coffeesInCart)

  function addCoffeeToCart(data: CartItem) {
    const newCoffeeCart = {
      id: data.id,
      image: data.image,
      description: data.description,
      title: data.title,
      tags: data.tags,
      price: data.price,
      quantity: data.quantity,
    }

    dispatch(addNewCoffeToCartAction(newCoffeeCart))
  }

  return (
    <CartContext.Provider
      value={{
        addCoffeeToCart,
        cartQuantity,
        cafes,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
