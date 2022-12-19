import styled from 'styled-components'

export const CheckoutContainer = styled.div``
export const AddressContainer = styled.div`
  width: 640px;
  height: 372px;

  h1 {
    margin-top: 40px;
    font-family: 'Baloo 2';
    font-weight: 700;
    font-size: 18px;
  }

  > div {
    border-radius: 6px;
    margin-top: 15px;
    padding: 40px;
    background: ${(props) => props.theme['base-Card']};
  }
`

const baseInput = styled.input`
  display: flex;
  width: 100%;
  height: 42px;
  padding: 12px;
  background: ${(props) => props.theme['base-Input']};

  border: 1px solid ${(props) => props.theme['base-Button']};
  border-radius: 4px;

  ::placeholder {
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    color: ${(props) => props.theme['base-Label']};
  }
`

export const Input = styled(baseInput)``

export const FormAddrees = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 2rem;

  input {
    width: 200px;
  }

  input + input {
    width: 100%;
  }

  div {
    display: flex;
    flex-direction: row;
    gap: 12px;

    input {
      width: 200px;
    }

    .complemento {
      width: 100%;
    }

    .cidade {
      width: 276px;
    }
    .uf {
      width: 60px;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const CoffesSelectedCheckout = styled.div``
