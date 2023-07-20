import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { MakeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/Value-objects/Slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase // system under test

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to get a question by slug', async () => {
    const NewQuestion = MakeQuestion({
      slug: Slug.create('example-question'),
    })

    await inMemoryQuestionsRepository.create(NewQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    // abaixo erros do typescript não consegui resolve-los, a melhor opção será ignora-los
    expect(result.value?.question.id).toBeTruthy()
    expect(result.value?.question.slug.value).toEqual('example-question')
  })
})
