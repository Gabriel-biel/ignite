import { Title } from './components/Title'
import {
  AddressContainer,
  CheckoutContainer,
  CoffesSelectedCheckout,
  FormAddrees,
  Input,
} from './styles'

const cartItems = [
  {
    id: 1,
    tags: ['TRADICIONAL'],
    title: 'Expresso Tradicional',
    description: 'Tradicional café, feito com água quente e grãos moidos',
    price: 9.99,
    image: 'http://127.0.0.1:5173/src/assets/coffeeImages/tradicional.svg',
  },
  {
    id: 2,
    tags: ['TRADICIONAL'],
    title: 'Expresso Tradicional',
    description: 'Tradicional café, feito com água quente e grãos moidos',
    price: 9.99,
    image: 'http://127.0.0.1:5173/src/assets/coffeeImages/tradicional.svg',
  },
]

export function Checkout() {
  return (
    <CheckoutContainer>
      <AddressContainer>
        <h1>Complete seu pedido</h1>
        <div>
          <Title />
          <FormAddrees>
            <Input type="number" placeholder="Cep" />
            <Input type="text" placeholder="Rua" />
            <div>
              <Input type="number" placeholder="Número" />
              <Input
                className="complemento"
                type="text"
                placeholder="Complemento"
              />
            </div>
            <div>
              <Input type="text" placeholder="Bairro" />
              <Input className="cidade" type="text" placeholder="Cidade" />
              <Input className="uf" type="text" placeholder="UF" />
            </div>
          </FormAddrees>
        </div>
      </AddressContainer>
      <CoffesSelectedCheckout></CoffesSelectedCheckout>
    </CheckoutContainer>
  )
}
