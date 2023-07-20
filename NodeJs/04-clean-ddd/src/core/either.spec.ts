import { Either, left, right } from './either'

describe('Test either', () => {
  function doSomething(shouldSucess: boolean): Either<string, string> {
    if (shouldSucess) {
      return right('Success')
    } else {
      return left('error')
    }
  }

  it('Sucess Result', () => {
    const successResult = doSomething(true)

    expect(successResult.isRight()).toBe(true)
  })
  it('Error Result', () => {
    const successResult = doSomething(false)

    expect(successResult.isRight()).toBe(false)
  })
})
