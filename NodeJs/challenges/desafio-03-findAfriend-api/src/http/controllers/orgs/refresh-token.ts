import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify({ onlyCookie: true })
    const payload_org_role = request.user.role
    const payload_org_sub_id = request.user.sub
    const token = await reply.jwtSign(
      {
        role: payload_org_role,
      },
      {
        sign: {
          sub: payload_org_sub_id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: payload_org_role,
      },
      { sign: { sub: payload_org_sub_id, expiresIn: '7d' } },
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
