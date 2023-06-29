import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { MakeDeleteUserUseCase } from '@/use-cases/factories/make-delete-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserParamsSchema = z.object({
    userId: z.string(),
  })

  try {
    const { userId } = deleteUserParamsSchema.parse(request.params)
    const deleteUserUseCase = MakeDeleteUserUseCase()

    await deleteUserUseCase.execute({
      userId,
    })
    return reply.status(200).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
