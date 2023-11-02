import { HashCompare } from '@/domain/delivery-management/application/cryptography/hash-compare'
import { HashGenerator } from '@/domain/delivery-management/application/cryptography/hash-generator'
import { compare, hash } from 'bcryptjs'

export class BcryptHash implements HashGenerator, HashCompare {
  private hash_salt_length = 8

  async hash(plain: string) {
    return hash(plain, this.hash_salt_length)
  }

  async compare(plain: string, hash: string) {
    return compare(plain, hash)
  }
}
