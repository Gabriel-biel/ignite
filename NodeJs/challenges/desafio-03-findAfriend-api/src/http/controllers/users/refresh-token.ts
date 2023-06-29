import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // essa opão valida que o usuário está authenticated mas não olha na info do cabeçalho, ela vai olha para os cookies da nossa request
    // pra ver se lá existe refresh
    await request.jwtVerify({ onlyCookie: true })
    const payload_user_role = request.user.role
    const payload_sub_user_id = request.user.sub

    const token = await reply.jwtSign(
      {
        payload_user_role,
      },
      {
        sign: { sub: payload_sub_user_id },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        payload_user_role,
      },
      {
        sign: {
          sub: payload_sub_user_id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/', // quais rotas do backend vai ter acesso a esse cookie.
        secure: true, // Define que nosso cookie vai ser encriptado pelo https.
        sameSite: true, // Define que esse cookie só vai ser acessível dentro do mesmo dominío, dentro do mesmo site.
        httpOnly: true, // esse cookie só vai poder acessado pela requesição e responsta, somente pelo contexto da requesição
      })
      .send({ token })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
