import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'
import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'uploads'),
    }),
    AuthModule,
    HttpModule,
    EnvModule,
  ],
})
export class AppModule {}
