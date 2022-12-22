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
  coffeesInCart: Coffee[]
}

export function CoffeeReducer(state: CoffeeState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_COFFEE:
      return produce(state, (draft) => {
        draft.coffeesInCart.push(action.payload.AddCoffee)
      })

    case ActionTypes.REMOVE_COFFEE: {
      const currentCafeIndex = state.cafes.findIndex((cafe) => {
        return cafe.id === action.payload.RemoveCoffee.id
      })

      if (currentCafeIndex < 0) {
        return state
      }
      return produce(state, (draft) => {})
    }

    default:
      return state
  }
}
