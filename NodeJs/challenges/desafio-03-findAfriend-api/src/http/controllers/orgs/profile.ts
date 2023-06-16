import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { MakeGetOrgProfile } from '@/use-cases/factories/make-get-org-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getOrgProfile = MakeGetOrgProfile()
    const { org } = await getOrgProfile.execute({ orgId: request.user.sub })

    return reply.status(200).send({
      org: {
        ...org,
        password_hash: undefined,
      },
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
