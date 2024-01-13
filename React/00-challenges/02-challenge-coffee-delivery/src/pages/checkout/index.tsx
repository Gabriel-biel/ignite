import { CreditCard, CurrencyDollar, MapPinLine, Money } from 'phosphor-react'
import {
  AddressContainerForm,
  AddressInputs,
  CartContainer,
  CheckoutContainer,
  ClientInfosContainer,
  FormContainer,
  PaymentMethod,
  PaymentMethodContainer,
  SelectedCoffeeList,
} from './styles'
import { Input } from './components/input'
import { useContext, useState } from 'react'
import { CartContext } from '../../hooks/CartContext'
import { CoffeeCartCard } from './components/CoffeeCartCard'

type PaymentMethods = 'CREDIT_CARD' | 'DEBIT_CARD' | 'MONEY'

export function Checkout() {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethods>('CREDIT_CARD')

  const { addedCoffees } = useContext(CartContext)

  return (
    <CheckoutContainer>
      <ClientInfosContainer>
        <strong>Complete seu pedido</strong>
        <FormContainer>
          <AddressContainerForm>
            <header>
              <MapPinLine size={22} />
              <div>
                <span>Endereço de entrega</span>
                <span>Informe o endereço onde deseja receber seu pedido</span>
              </div>
            </header>
            <AddressInputs>
              <Input placeholder="CEP" area="cep" mask="99999-999" />
              <Input placeholder="Rua" area="street" />
              <Input placeholder="Número" area="number" type="number" min={1} />
              <Input placeholder="Complemento" area="complement" optional />
              <Input placeholder="Bairro" area="district" />
              <Input placeholder="Cidade" area="city" />
              <Input placeholder="UF" area="uf" />
            </AddressInputs>
          </AddressContainerForm>
          <PaymentMethodContainer>
            <header>
              <CurrencyDollar size={22} />
              <div>
                <span>Pagamento</span>
                <span>
                  O pagamento é feito na entrega. Escolha a forma que deseja
                  pagar
                </span>
              </div>
            </header>
            <div>
              <PaymentMethod
                type="button"
                selected={paymentMethod === 'CREDIT_CARD'}
                onClick={() => setPaymentMethod('CREDIT_CARD')}
              >
                <CreditCard size={16} />
                CARTÃO DE CRÉDITO
              </PaymentMethod>
              <PaymentMethod
                type="button"
                selected={paymentMethod === 'DEBIT_CARD'}
                onClick={() => setPaymentMethod('DEBIT_CARD')}
              >
                <CreditCard size={16} />
                CARTÃO DE DÉBITO
              </PaymentMethod>
              <PaymentMethod
                type="button"
                selected={paymentMethod === 'MONEY'}
                onClick={() => setPaymentMethod('MONEY')}
              >
                <Money size={16} />
                DINHEIRO
              </PaymentMethod>
            </div>
          </PaymentMethodContainer>
        </FormContainer>
      </ClientInfosContainer>
      <SelectedCoffeeList>
        <strong>Cafés Selecionados</strong>
        <CartContainer>
          {addedCoffees.length > 0 ? (
            <>
              {addedCoffees.map((addedCoffee) => (
                <CoffeeCartCard
                  key={addedCoffee.coffee.id}
                  addedCoffee={addedCoffee}
                />
              ))}
            </>
          ) : (
            <span>Nenhum café selecionado</span>
          )}
        </CartContainer>
      </SelectedCoffeeList>
    </CheckoutContainer>
  )
}
