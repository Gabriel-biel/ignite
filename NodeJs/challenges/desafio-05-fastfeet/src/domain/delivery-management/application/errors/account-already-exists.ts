import { UseCaseError } from '@/core/errors/use-case-erro'

export class AccountAlreadyExists extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Account "${identifier}" already exists`)
  }
}
