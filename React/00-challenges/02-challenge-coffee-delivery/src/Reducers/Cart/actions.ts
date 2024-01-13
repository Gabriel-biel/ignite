import { Coffee } from '../../server/coffee'

export enum CartActionTypes {
  ADD_COFFEE_TO_CART = 'ADD_COFFEE_TO_CART',
  REMOVE_COFFEE_FROM_CART = 'REMOVE_COFFEE_FROM_CART',
  INCREASE_AMOUNT_ADDED_COFFEE = 'INCREASE_AMOUNT_ADDED_COFFEE',
  DECREASE_AMOUNT_ADDED_COFFEE = 'DECREASE_AMOUNT_ADDED_COFFEE',
}

export function addCoffeeToCartAction(coffee: Coffee, amount: number) {
  return {
    type: CartActionTypes.ADD_COFFEE_TO_CART,
    payload: {
      coffee,
      amount,
    },
  }
}

export function removeCoffeeFromCartAction(coffeeId: string) {
  return {
    type: CartActionTypes.REMOVE_COFFEE_FROM_CART,
    payload: {
      coffeeId,
    },
  }
}

export function increaseAmountAddedCoffeeAction(coffeeId: string) {
  return {
    type: CartActionTypes.INCREASE_AMOUNT_ADDED_COFFEE,
    payload: {
      coffeeId,
    },
  }
}
export function decreaseAmountAddedCoffeeAction(coffeeId: string) {
  return {
    type: CartActionTypes.DECREASE_AMOUNT_ADDED_COFFEE,
    payload: {
      coffeeId,
    },
  }
}
