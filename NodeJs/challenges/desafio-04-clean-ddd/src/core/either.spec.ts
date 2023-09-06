import { rigth } from './either'

describe('Either tests', () => {
  it('sucess result', async () => {
    const sucess = rigth('sucess')

    expect(sucess.value).toEqual('sucess')
  })
})
