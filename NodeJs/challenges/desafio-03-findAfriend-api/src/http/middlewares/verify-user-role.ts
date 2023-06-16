import { FastifyReply, FastifyRequest } from 'fastify'

export function VerifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== 'ADMIN') {
      return reply.status(401).send({ message: 'Unhauthorized.' })
    }
  }
}
