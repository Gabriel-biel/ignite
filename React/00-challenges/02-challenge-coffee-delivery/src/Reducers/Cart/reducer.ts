import { produce } from 'immer'
import { Coffee } from '../../server/coffee'
import { CartActionTypes } from './actions'

export interface AddedCoffee {
  coffee: Coffee
  amount: number
}

interface CartState {
  addedCoffees: AddedCoffee[]
  totalCoffeesAddedToCart: number
  totalPrice: number
}

function calcTotalCoffeesAddedToCart(cartState: AddedCoffee[]) {
  return cartState.reduce((acc, current) => {
    return acc + current.amount
  }, 0)
}

function calcTotalPriceOfCoffeesAddedToCart(cartState: AddedCoffee[]) {
  return cartState.reduce((acc, current) => {
    return acc + current.amount * current.coffee.price
  }, 0)
}

export function CartReducer(state: CartState, action: any) {
  switch (action.type) {
    case CartActionTypes.ADD_COFFEE_TO_CART: {
      return produce(state, (draft) => {
        draft.addedCoffees.unshift({
          coffee: action.payload.coffee,
          amount: action.payload.amount,
        })

        draft.totalCoffeesAddedToCart = calcTotalCoffeesAddedToCart(
          draft.addedCoffees,
        )
        draft.totalPrice = calcTotalPriceOfCoffeesAddedToCart(
          draft.addedCoffees,
        )
      })
    }

    case CartActionTypes.REMOVE_COFFEE_FROM_CART: {
      return produce(state, (draft) => {
        draft.addedCoffees = state.addedCoffees.filter(
          (addedCoffee) => addedCoffee.coffee.id !== action.payload.coffeeId,
        )

        draft.totalCoffeesAddedToCart = calcTotalCoffeesAddedToCart(
          draft.addedCoffees,
        )

        draft.totalPrice = calcTotalPriceOfCoffeesAddedToCart(
          draft.addedCoffees,
        )
      })
    }

    case CartActionTypes.INCREASE_AMOUNT_ADDED_COFFEE: {
      const addedCoffeeIndex = state.addedCoffees.findIndex(
        (addedCoffee) => addedCoffee.coffee.id === action.payload.coffeeId,
      )

      if (addedCoffeeIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.addedCoffees[addedCoffeeIndex] = {
          ...draft.addedCoffees[addedCoffeeIndex],
          amount: draft.addedCoffees[addedCoffeeIndex].amount + 1,
        }

        draft.totalCoffeesAddedToCart = calcTotalCoffeesAddedToCart(
          draft.addedCoffees,
        )

        draft.totalPrice = calcTotalPriceOfCoffeesAddedToCart(
          draft.addedCoffees,
        )
      })
    }

    case CartActionTypes.DECREASE_AMOUNT_ADDED_COFFEE: {
      const addedCoffeeIndex = state.addedCoffees.findIndex(
        (addedCoffee) => addedCoffee.coffee.id === action.payload.coffeeId,
      )

      if (addedCoffeeIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        if (draft.addedCoffees[addedCoffeeIndex].amount === 1) {
          draft.addedCoffees = draft.addedCoffees.filter(
            (addedCoffee) => addedCoffee.coffee.id !== action.payload.coffeeId,
          )
        } else {
          draft.addedCoffees[addedCoffeeIndex] = {
            ...draft.addedCoffees[addedCoffeeIndex],
            amount: draft.addedCoffees[addedCoffeeIndex].amount - 1,
          }
        }

        draft.totalCoffeesAddedToCart = calcTotalCoffeesAddedToCart(
          draft.addedCoffees,
        )
        draft.totalPrice = calcTotalPriceOfCoffeesAddedToCart(
          draft.addedCoffees,
        )
      })
    }

    default: {
      return state
    }
  }
}
