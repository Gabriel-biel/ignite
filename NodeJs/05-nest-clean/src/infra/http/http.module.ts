import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/authenticate.controller'
import { RegisterStudentController } from './controllers/register-student.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/crypography.module'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { EditQuestionController } from './controllers/edit-question.controller'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { RegisterInstructorController } from './controllers/register-instructor.controller'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { FetchQuestionAnswersController } from './controllers/fetch-question-answers.controller'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { CommentOnQuestionController } from './controllers/comment-on-question.controller'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller'
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller'
import { FetchQuestionCommentsController } from './controllers/fetch-question-comments.controller'
import { FetchAnswerCommentsController } from './controllers/fetch-answer-comments.controller'
import { UploadAttachmentsController } from './controllers/upload-attachments.controller'

import { StorageModule } from '../storage/storage.module'

import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { RegisterInstructorUseCase } from '@/domain/forum/application/use-cases/register-instructor'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-commet'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recents-questions'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
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
    UploadAttachmentsController,
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
    UploadAndCreateAttachmentUseCase,
  ],
})
export class HttpModule {}
