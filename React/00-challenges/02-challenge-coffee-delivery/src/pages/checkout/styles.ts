import styled, { css } from 'styled-components'

interface PaymentMethodProps {
  selected: boolean
}

export const CheckoutContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 2.5rem 0;
  gap: 2rem;

  @media (max-width: 1366px) {
    padding: 1rem 0;
    gap: 1rem;
  }
`

export const ClientInfosContainer = styled.div`
  strong {
    font-family: 'Baloo 2';
    font-size: 1.125rem;
    color: ${(props) => props.theme['--base-subtitle']};
    display: block;
    margin-bottom: 1rem;
  }
`

export const FormContainer = styled.form``

export const AddressContainerForm = styled.div`
  width: 100%;
  padding: 2.5rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;

  background: ${(props) => props.theme['--base-Card']};

  header {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 2rem;

    svg {
      color: ${(props) => props.theme['--yellow-800']};
    }

    div {
      span {
        color: ${(props) => props.theme['--base-Subtitle']};
        line-height: 1.3;
        display: block;

        &:last-child {
          font-size: 0.875rem;
          color: ${(props) => props.theme['--base-Text']};
        }
      }
    }
  }
`
export const AddressInputs = styled.div`
  display: grid;
  grid-template-areas:
    'cep . .'
    'street street street'
    'number complement complement'
    'district city uf';
  grid-template-columns: 1fr 1fr 3.75rem;
  row-gap: 1rem;
  column-gap: 0.75rem;

  @media (max-width: 1366px) {
    gap: 0.5rem;
  }

  @media (max-width: 1088px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`

export const PaymentMethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 2.5rem;
  background: ${(props) => props.theme['--base-Card']};
  border-radius: 6px;

  header {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;

    svg {
      color: ${(props) => props.theme['--purple-500']};
    }

    div {
      span {
        color: ${(props) => props.theme['--base-Subtitle']};
        line-height: 1.3;
        display: block;

        &:last-child {
          font-size: 0.875rem;
          color: ${(props) => props.theme['--base-text']};
        }
      }
    }
  }

  & > div {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    gap: 0.75rem;
  }
`

export const PaymentMethod = styled.button<PaymentMethodProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  gap: 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;

  @media (max-width: 1088px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }

  background: ${(props) => props.theme['--base-Button']};
  border: 1px solid ${(props) => props.theme['--base-Button']};

  svg {
    color: ${(props) => props.theme['--purple-500']};
  }

  transition:
    background-color,
    border-color 0.2s;

  &:hover {
    background: ${(props) => props.theme['--base-Hover']};
    border: 1px solid ${(props) => props.theme['--base-Hover']};
  }

  ${(props) =>
    props.selected &&
    css`
      background: ${(props) => props.theme['--purple-300']};
      border: 1px solid ${(props) => props.theme['--purple-500']};

      &:hover {
        background: ${(props) => props.theme['--purple-300']};
        border: 1px solid ${(props) => props.theme['--purple-500']};
      }
    `}
`

export const SelectedCoffeeList = styled.div`
  strong {
    font-family: 'Baloo 2';
    font-size: 1.125rem;
    color: ${(props) => props.theme['--base-subtitle']};
    display: flex;
    margin-bottom: 1rem;
  }
`

export const CartContainer = styled.div`
  padding: 0.5rem 2.5rem 2.5rem;
  background: ${(props) => props.theme['--base-Card']};
  border-radius: 6px 44px 6px 44px;

  & > span {
    display: block;
    margin-top: 1rem;
    color: ${(props) => props.theme['--base-Label']};
  }
`
