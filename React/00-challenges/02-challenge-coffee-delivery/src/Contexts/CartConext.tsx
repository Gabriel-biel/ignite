import produce from 'immer'
import { createContext, ReactNode, useState } from 'react'
import { Coffee } from '../Reducers/Coffee/reducer'

interface CartItem extends Coffee {
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addCoffeeToCart: (coffee: CartItem) => void
  cartQuantity: number
  cartItemTotalPrice: number
}

interface CoffeeProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CoffeeProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storagedCart = localStorage.getItem('@ignite-coffee-1.0.0')

    if (storagedCart) {
      return JSON.parse(storagedCart)
    }

    return []
  })

  const cartQuantity = cartItems.length

  const cartItemTotalPrice = cartItems.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.quantity
  }, 0)

  function addCoffeeToCart(coffee: CartItem) {
    const coffeeAlreadyExistsInCart = cartItems.findIndex(
      (cartItem) => cartItem.id === coffee.id,
    )

    const newCart = produce(cartItems, (draft) => {
      if (coffeeAlreadyExistsInCart < 0) {
        draft.push(coffee)
      } else {
        draft[coffeeAlreadyExistsInCart].quantity += coffee.quantity
      }
    })

    setCartItems(newCart)
  }

  return (
    <CartContext.Provider
      value={{
        addCoffeeToCart,
        cartQuantity,
        cartItems,
        cartItemTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
