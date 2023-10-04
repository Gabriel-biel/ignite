import { Encrypter } from '@/domain/forum/aplication/cryptography/encypter'
import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { HashCompare } from '@/domain/forum/aplication/cryptography/hash-compare'
import { BcryptHasher } from './bcrypt-hash'
import { HashGenerator } from '@/domain/forum/aplication/cryptography/hash-generator'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashCompare,
      useClass: BcryptHasher,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HashCompare, HashGenerator],
})
export class CryptographyModule {}
