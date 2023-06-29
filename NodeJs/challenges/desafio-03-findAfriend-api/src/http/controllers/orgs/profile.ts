import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { MakeGetOrgProfileUseCase } from '@/use-cases/factories/make-get-org-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getOrgProfileuseCase = MakeGetOrgProfileUseCase()
    const { org } = await getOrgProfileuseCase.execute({
      orgId: request.user.sub,
    })

    return reply.status(200).send({ org })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
