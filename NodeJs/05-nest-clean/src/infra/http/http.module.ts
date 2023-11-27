import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/authenticate.controller'
import { RegisterStudentController } from './controllers/register-student.controller'
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
import { EditQuestionController } from './controllers/edit-question.controller'
import { EditQuestionUseCase } from '@/domain/forum/aplication/use-cases/edit-question'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { DeleteQuestionUseCase } from '@/domain/forum/aplication/use-cases/delete-question'
import { RegisterInstructorUseCase } from '@/domain/forum/aplication/use-cases/register-instructor'
import { RegisterInstructorController } from './controllers/register-instructor.controller'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { AnswerQuestionUseCase } from '@/domain/forum/aplication/use-cases/answer-question'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    RegisterStudentController,
    RegisterInstructorController,
    AuthenticateController,
    CreateQuestionController,
    AnswerQuestionController,
    EditQuestionController,
    DeleteQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
  ],
  providers: [
    RegisterStudentUseCase,
    RegisterInstructorUseCase,
    AuthenticateStudentUseCase,
    CreateQuestionUseCase,
    AnswerQuestionUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    FetchRecentQuestionsUseCase,
    GetQuestionBySlugUseCase,
  ],
})
export class HttpModule {}
