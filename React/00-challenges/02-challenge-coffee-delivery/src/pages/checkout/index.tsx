import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from 'phosphor-react'
import { useContext } from 'react'
import { useTheme } from 'styled-components'
import { CoffeeCard } from '../../components/CoffeeCard'
import { CartContext } from '../../Contexts/CartConext'
import { formatPrice } from '../../util/format'

import { Title } from './components/Title'
import {
  AddressContainer,
  CheckoutContainer,
  CoffesSelectedCheckout,
  FormAddrees,
  PaymentMethod,
  CardDebitMethod,
  CardCreditMethod,
  MoneyMethod,
  Input,
} from './styles'

export function Checkout() {
  const colors = useTheme()
  const { cafes } = useContext(CartContext)

  return (
    <CheckoutContainer>
      <AddressContainer>
        <h1>Complete seu pedido</h1>
        <div>
          <Title
            icon={
              <MapPinLine
                size={22}
                color={colors['yellow-800']}
                weight="regular"
              />
            }
            title="Endereço de Entrega"
            description="Informe o endereço onde deseja receber o pedido"
          />
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
        <PaymentMethod>
          <Title
            icon={
              <CurrencyDollar
                size={22}
                color={colors['purple-800']}
                weight={'regular'}
              />
            }
            title="Pagamento"
            description="O pagamento é feito na entrega. Escolha a forma que deseja pagar"
          />
          <div>
            <CardCreditMethod>
              <CreditCard size={16} weight="regular" />
              <p>CARTÃO DE CRÉDITO</p>
            </CardCreditMethod>
            <CardDebitMethod>
              <Bank size={16} weight="regular" />
              <p>CARTÃO DE DEBITO</p>
            </CardDebitMethod>
            <MoneyMethod>
              <Money size={16} weight="regular" />
              <p>DINHEIRO</p>
            </MoneyMethod>
          </div>
        </PaymentMethod>
      </AddressContainer>
      <CoffesSelectedCheckout>
        <h1>Cafés Selecionados</h1>
        <div>
          {cafes.map((cafe) => {
            return (
              <>
                <CoffeeCard
                  key={cafe.id}
                  coffee={cafe}
                  typeCardCoffeeCatalog={false}
                />
                <hr />
                <span>
                  <p>Total de intens</p>
                  <p>{formatPrice(cafe.price * cafe.quantity)}</p>
                </span>
                <span>
                  <p>Entrega</p>
                  <p>0.00</p>
                </span>
                <span>
                  <strong>Total</strong>
                  <strong>{formatPrice(cafe.price * cafe.quantity)}</strong>
                </span>
              </>
            )
          })}
        </div>
      </CoffesSelectedCheckout>
    </CheckoutContainer>
  )
}
