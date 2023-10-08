import { Either, left, rigth } from './either'

describe('Test either', () => {
  function doSomething(shouldSucess: boolean): Either<string, string> {
    if (shouldSucess) {
      return rigth('Success')
    } else {
      return left('error')
    }
  }

  it('Sucess Result', () => {
    const successResult = doSomething(true)

    expect(successResult.isRigth()).toBe(true)
  })
  it('Error Result', () => {
    const successResult = doSomething(false)

    expect(successResult.isRigth()).toBe(false)
  })
})
