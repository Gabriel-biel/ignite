import { Encrypter } from '@/domain/delivery-management/application/cryptography/encypter'
import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { HashCompare } from '@/domain/delivery-management/application/cryptography/hash-compare'
import { BcryptHash } from './bcrypt-hasher'
import { HashGenerator } from '@/domain/delivery-management/application/cryptography/hash-generator'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashCompare,
      useClass: BcryptHash,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHash,
    },
  ],
  exports: [Encrypter, HashCompare, HashGenerator],
})
export class CryptografyModule {}
