import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CreateAccountController } from './http/controllers/create-account.controller'
import { envSchema } from './env'
import { AuthenticateController } from './http/controllers/authenticate.controller'
import { FetchRecentQuestionsController } from './http/controllers/fetch-recent-questions.controller'
import { CreateQuestionController } from './http/controllers/create-question.controller'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
