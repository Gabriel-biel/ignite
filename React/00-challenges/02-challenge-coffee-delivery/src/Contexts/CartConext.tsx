import { createContext, ReactNode, useReducer } from 'react'
import { addNewCoffeToCartAction } from '../Reducers/Cart/actions'
import { Coffee, CoffeeReducer } from '../Reducers/Cart/reducer'

interface CartItem extends Coffee {
  quantity: number
}

interface CartContextType {
  cafes: CartItem[]
  addCoffeeToCart: (data: CartItem) => void
  cartQuantity: number
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [CartState, dispatch] = useReducer(
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

  const { cafes, coffeesInCart } = CartState
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
