import { Cycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'Add_New_Cycle',
  INTERRUPT_CURRENT_CYCLE = 'Interrupt_Current_Cycle',
  MARK_CURRENT_CYCLE_FINISH = 'Mark_Current_Cycle_Finish',
}
// Eslint apresentou bug durante o desenvolvimento da app, foi necessário add nova rule no
// arquivo de config do Eslint, "no-unused-vars": "off"

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}
export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_FINISH,
  }
}
export function interruptCurrentCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}
