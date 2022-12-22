import styled from 'styled-components'

export const CheckoutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`
export const AddressContainer = styled.div`
  width: 40rem;

  h1 {
    margin-top: 2.5rem;
    font-family: 'Baloo 2';
    font-weight: 700;
    font-size: 1.125rem;
  }

  > div {
    border-radius: 6px;
    margin-top: 1rem;
    padding: 2.5rem;
    background: ${(props) => props.theme['base-Card']};
  }
`

export const Input = styled.input`
  display: flex;
  width: 100%;
  height: 2.625rem;
  padding: 0.75rem;
  background: ${(props) => props.theme['base-Input']};

  border: 1px solid ${(props) => props.theme['base-Button']};
  border-radius: 4px;

  &:focus {
    outline: 1px solid ${(props) => props.theme['yellow-800']};
  }

  ::placeholder {
    display: flex;
    font-size: 87.5%;
    justify-content: space-between;
    color: ${(props) => props.theme['base-Label']};
  }
`

export const FormAddrees = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;

  input {
    width: 12.5rem;
  }

  input + input {
    width: 100%;
  }

  div {
    display: flex;
    flex-direction: row;
    gap: 0.75rem;

    .cidade {
      width: 17.25rem;
    }
    .uf {
      width: 3.75rem;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const PaymentMethod = styled.div`
  width: 40rem;
  background: ${(props) => props.theme['base-Card']};

  div + div {
    display: flex;
    gap: 0.75rem;
    margin-top: 2rem;
  }
`

export const CoffesSelectedCheckout = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin-top: 2.5rem;
    font-family: 'Baloo 2';
    font-weight: 700;
    font-size: 1.125rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    padding: 2.5rem;
    background: ${(props) => props.theme['base-Card']};
    border-radius: 6px 44px;
    gap: 0.75rem;
  }

  hr {
    margin: 24px 0;
    border: 1px solid ${(props) => props.theme['base-Button']};
  }

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  strong {
    font-size: 1.25rem;
    color: ${(props) => props.theme['base-SubTitle']};
    font-weight: 700;
  }
`

const baseMethodPayment = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  background: ${(props) => props.theme['base-Button']};
  border: none;
  border-radius: 6px;
  padding: 1rem;
  gap: 0.75rem;
  font-size: 75%;
  line-height: 160%;

  svg {
    color: ${(props) => props.theme['purple-800']};
  }
`

export const CardCreditMethod = styled(baseMethodPayment)``
export const CardDebitMethod = styled(baseMethodPayment)``
export const MoneyMethod = styled(baseMethodPayment)``
