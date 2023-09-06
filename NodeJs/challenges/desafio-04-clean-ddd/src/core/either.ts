export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isLeft(): this is Left<L, R> {
    return true
  }

  isRigth(): this is Rigth<R, L> {
    return false
  }
}

export class Rigth<R, L> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isLeft(): this is Left<L, R> {
    return false
  }

  isRigth(): this is Rigth<R, L> {
    return true
  }
}

export type Either<L, R> = Left<L, R> | Rigth<R, L>

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const rigth = <L, R>(value: R): Either<L, R> => {
  return new Rigth(value)
}
