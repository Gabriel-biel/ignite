// Error
export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isRigth(): this is Rigth<L, R> {
    return false
  }

  isLeft(): this is Rigth<L, R> {
    return true
  }
}

// Sucess
export class Rigth<R, L> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isRigth(): this is Rigth<L, R> {
    return true
  }

  isLeft(): this is Rigth<L, R> {
    return false
  }
}

export type Either<L, R> = Left<L, R> | Rigth<R, L>

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const rigth = <L, R>(value: R): Either<L, R> => {
  return new Rigth(value)
}
