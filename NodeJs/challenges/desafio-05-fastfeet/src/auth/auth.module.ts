import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { Env } from '@/env'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const JWT_PRIVATE_KEY = config.get('JWT_PRIVATE_KEY', { infer: true })
        const JWT_PUBLIC_KEY = config.get('JWT_PUBLIC_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(JWT_PRIVATE_KEY, 'base64'),
          publicKey: Buffer.from(JWT_PUBLIC_KEY, 'base64'),
        }
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
