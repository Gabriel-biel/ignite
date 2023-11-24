import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './jwt-auth.guard'
import { EnvService } from '../env/env.service'
import { EnvModule } from '../env/env.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(env: EnvService) {
        const JWT_PRIVATE_KEY = env.get('JWT_PRIVATE_KEY')
        const JWT_PUBLIC_KEY = env.get('JWT_PUBLIC_KEY')

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(JWT_PRIVATE_KEY, 'base64'),
          publicKey: Buffer.from(JWT_PUBLIC_KEY, 'base64'),
        }
      },
    }),
  ],
  providers: [
    JwtStrategy,
    EnvService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
