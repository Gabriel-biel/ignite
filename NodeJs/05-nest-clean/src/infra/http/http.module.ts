import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/aplication/use-cases/create-question'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/aplication/use-cases/fetch-recents-questions'
import { RegisterStudentUseCase } from '@/domain/forum/aplication/use-cases/register-student'
import { AuthenticateStudentUseCase } from '@/domain/forum/aplication/use-cases/authenticate-student'
import { CryptographyModule } from '../cryptography/crypography.module'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { GetQuestionBySlugUseCase } from '@/domain/forum/aplication/use-cases/get-question-by-slug'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
  ],
  providers: [
    CreateQuestionUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    FetchRecentQuestionsUseCase,
    GetQuestionBySlugUseCase,
  ],
})
export class HttpModule {}
