import { Coffee } from './reducer'

export enum ActionTypes {
  ADD_NEW_COFFEE = 'ADD_NEW_COFEE',
  REMOVE_COFFEE = 'REMOVE_COFEE',
}

export function addNewCoffeToCartAction(AddCoffee: Coffee) {
  return {
    type: ActionTypes.ADD_NEW_COFFEE,
    payload: {
      AddCoffee,
    },
  }
}
export function removeCoffeeToCartAction(RemoveCoffee: Coffee) {
  return {
    type: ActionTypes.REMOVE_COFFEE,
  }
}
