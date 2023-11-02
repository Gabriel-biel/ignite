import { Encrypter } from '@/domain/delivery-management/application/cryptography/encypter'
import { JwtService } from '@nestjs/jwt'

export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}

  async encrypt(payload: Record<string, unknown>) {
    return this.jwtService.signAsync(payload)
  }
}
