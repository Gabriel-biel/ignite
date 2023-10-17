// Error
export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isLeft(): this is Left<L, R> {
    return true
  }

  isRigth(): this is Rigth<L, R> {
    return false
  }
}

// Success
export class Rigth<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isLeft(): this is Left<L, R> {
    return false
  }

  isRigth(): this is Rigth<L, R> {
    return true
  }
}

export type Either<L, R> = Left<L, R> | Rigth<L, R>

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const rigth = <L, R>(value: R): Either<L, R> => {
  return new Rigth(value)
}
