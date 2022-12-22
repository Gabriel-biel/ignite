import { createContext, ReactNode, useEffect, useReducer } from 'react'
import { addNewCoffeToCartAction } from '../Reducers/Coffee/actions'
import { Coffee, CoffeeReducer } from '../Reducers/Coffee/reducer'

interface CartItem extends Coffee {
  quantity: number
}

interface CartContextType {
  cafes: CartItem[]
  addCoffeeToCart: (data: CartItem) => void
  cartQuantity: number
  // cartItemTotalPrice: number
}

interface CoffeeProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CoffeeProviderProps) {
  // const [cartItems, setCartItems] = useState<CartItem[]>(() => {
  //   const storagedCart = localStorage.getItem('@ignite-coffee-1.0.0')

  //   if (storagedCart) {
  //     return JSON.parse(storagedCart)
  //   }

  //   return []
  // })

  const [CoffeeState, dispatch] = useReducer(
    CoffeeReducer,
    {
      coffees: [],
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
        coffees: [],
        coffeesInCart: [],
      }
    },
  )

  const { cafes, coffeesInCart } = CoffeeState

  // const cartQuantity = cartItems.length
  const cartQuantity = coffeesInCart.length
  console.log(coffeesInCart)

  // const cartItemTotalPrice = coffeesInCart.reduce((total, coffeesInCart) => {
  //   return total + coffeesInCart.price * coffeesInCart.quantity
  // }, 0)

  // Add item no Storage
  // useEffect(() => {
  //   const stateJSON = JSON.stringify(CoffeeState)
  //   localStorage.setItem('@ignite-coffee:coffee-state-1.0.0', stateJSON)
  // }, [CoffeeState])

  function addCoffeeToCart(data: CartItem) {
    const newCoffeeCart: CartItem = {
      id: data.id,
      image: data.image,
      description: data.description,
      title: data.title,
      tags: data.tags,
      price: data.price,
      quantity: data.quantity + 1,
    }

    dispatch(addNewCoffeToCartAction(newCoffeeCart))
  }

  return (
    <CartContext.Provider
      value={{
        addCoffeeToCart,
        cartQuantity,
        cafes,
        // cartItemTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
