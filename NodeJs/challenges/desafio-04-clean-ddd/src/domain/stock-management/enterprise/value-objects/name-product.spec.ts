import { NameProduct } from './name-product'

describe('Create name product', () => {
  it('should be able to create a name for product', async () => {
    const name = NameProduct.createFromText(' Arroz com Feijão ')

    expect(name.value).toEqual('arroz-com-feijao')
  })
})
