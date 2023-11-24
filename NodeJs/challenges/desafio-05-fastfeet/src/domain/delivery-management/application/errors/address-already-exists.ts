import { UseCaseError } from '@/core/errors/use-case-erro'

export class AddressAlreadyExists extends Error implements UseCaseError {
  constructor() {
    super(`This address already exists!`)
  }
}
