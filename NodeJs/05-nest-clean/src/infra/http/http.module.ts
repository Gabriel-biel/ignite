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
import { EditAnswerController } from './controllers/edit-answer.controller'
import { EditAnswerUseCase } from '@/domain/forum/aplication/use-cases/edit-answer'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { DeleteAnswerUseCase } from '@/domain/forum/aplication/use-cases/delete-answer'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/aplication/use-cases/fetch-question-answers'
import { FetchQuestionAnswersController } from './controllers/fetch-question-answers.controller'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/aplication/use-cases/choose-question-best-answer'
import { CommentOnQuestionUseCase } from '@/domain/forum/aplication/use-cases/comment-on-question'
import { CommentOnQuestionController } from './controllers/comment-on-question.controller'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller'
import { DeleteQuestionCommentUseCase } from '@/domain/forum/aplication/use-cases/delete-question-comment'
import { CommentOnAnswerUseCase } from '@/domain/forum/aplication/use-cases/comment-on-answer'
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller'
import { DeleteAnswerCommentUseCase } from '@/domain/forum/aplication/use-cases/delete-answer-commet'
import { FetchQuestionCommentsController } from './controllers/fetch-question-comments.controller'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/aplication/use-cases/fetch-question-comments'
import { FetchAnswerCommentsController } from './controllers/fetch-answer-comments.controller'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/aplication/use-cases/fetch-answer-comments'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    RegisterStudentController,
    RegisterInstructorController,
    AuthenticateController,
    CreateQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionAnswersController,
    FetchAnswerCommentsController,
    EditQuestionController,
    DeleteQuestionController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    FetchRecentQuestionsController,
    FetchQuestionCommentsController,
    GetQuestionBySlugController,
    ChooseQuestionBestAnswerController,
  ],
  providers: [
    RegisterStudentUseCase,
    RegisterInstructorUseCase,
    AuthenticateStudentUseCase,
    CreateQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    CommentOnAnswerUseCase,
    DeleteAnswerCommentUseCase,
    FetchQuestionAnswersUseCase,
    FetchAnswerCommentsUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase,
    FetchRecentQuestionsUseCase,
    FetchQuestionCommentsUseCase,
    GetQuestionBySlugUseCase,
    ChooseQuestionBestAnswerUseCase,
  ],
})
export class HttpModule {}
