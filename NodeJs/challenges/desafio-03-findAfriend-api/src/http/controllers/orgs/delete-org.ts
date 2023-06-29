import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { MakeDeleteOrgUseCase } from '@/use-cases/factories/make-delete-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteOrg(request: FastifyRequest, reply: FastifyReply) {
  const deleteOrgParamsSchema = z.object({
    orgId: z.string(),
  })

  try {
    const { orgId } = deleteOrgParamsSchema.parse(request.params)
    const deleteOrgUseCase = MakeDeleteOrgUseCase()

    await deleteOrgUseCase.execute({
      orgId,
    })
    return reply.status(200).clearCookie('refreshToken').send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
