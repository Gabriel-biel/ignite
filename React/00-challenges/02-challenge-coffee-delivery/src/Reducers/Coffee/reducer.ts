import produce from 'immer'
import { ActionTypes } from './actions'

export interface Coffee {
  id: string
  title: string
  tags: string[]
  description: string
  price: string
  image: string
}

interface CoffeeState {
  cafes: Coffee[]
  coffeesInCartId: string
}

export function CoffeeReducer(state: CoffeeState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_COFFEE:
      return produce(state, (draft) => {
        draft.coffeesInCartId = action.payload.AddCoffee.id
      })

    case ActionTypes.REMOVE_COFFEE:
      const currentCoffeInCart = state.cafes.findIndex((coffee) => {
        return coffee.id === state.coffeesInCartId
      })

      return produce(state, (draft) => {
        draft.coffeesInCartId = action.payload.RemoveCoffee.id
      })
  }
}
