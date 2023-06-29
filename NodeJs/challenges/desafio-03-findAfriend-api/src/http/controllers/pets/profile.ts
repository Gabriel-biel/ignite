import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { MakeGetPetProfileUseCase } from '@/use-cases/factories/make-get-pet-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = profileParamsSchema.parse(request.params)

  try {
    const getPetProfileUseCase = MakeGetPetProfileUseCase()

    const { pet } = await getPetProfileUseCase.execute({ petId })

    return reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
