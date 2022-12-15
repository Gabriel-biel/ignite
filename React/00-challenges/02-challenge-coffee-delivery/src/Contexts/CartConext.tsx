import { createContext, ReactNode, useState } from 'react'

interface CartContextType {
  cofeeInCartId: [] | undefined
}

export const CartContext = createContext({} as CartContextType)

interface CoffeeProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CoffeeProviderProps) {
  // const [cart, setCart] = useState<Coffee[]>(() => {
  //   const storagedCart = localStorage.getItem('@ignite-coffee-1.0.0')

  //   if (storagedCart) {
  //     return JSON.parse(storagedCart)
  //   }

  //   return []
  // })

  return (
    <CartContext.Provider
      value={{
        coffeeInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
