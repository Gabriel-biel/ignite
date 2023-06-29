import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { MakeDeletePetUseCase } from '@/use-cases/factories/make-delete-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
  const deletePetParamsSchema = z.object({
    petId: z.string(),
  })

  try {
    const { petId } = deletePetParamsSchema.parse(request.params)

    const deletePetUseCase = MakeDeletePetUseCase()

    await deletePetUseCase.execute({
      petId,
    })
    return reply.status(200).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
