import produce from 'immer'
import { ActionTypes } from './actions'

export interface Coffee {
  id: string
  title: string
  tags: string[]
  description: string
  price: number
  image: string
  quantity: number
}

interface CoffeeState {
  cafes: Coffee[]
  coffeesInCart: number[]
}

export function CoffeeReducer(state: CoffeeState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_COFFEE: {
      const currentCafeIndex = state.cafes.findIndex((cafe) => {
        return cafe.id === action.payload.AddCoffee.id
      })

      if (currentCafeIndex < 0) {
        return produce(state, (draft) => {
          draft.cafes.push(action.payload.AddCoffee)
          draft.coffeesInCart.push(action.payload.AddCoffee.id)
        })
      }

      return produce(state, (draft) => {
        draft.cafes[currentCafeIndex].quantity =
          action.payload.AddCoffee.quantity + 1
      })
    }

    case ActionTypes.REMOVE_COFFEE: {
      const currentCafeIndex = state.cafes.findIndex((cafe) => {
        return cafe.id === action.payload.RemoveCoffee.id
      })

      if (currentCafeIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        draft.cafes[currentCafeIndex].quantity = action.payload.RemoveCoffee
      })
    }

    default:
      return state
  }
}
