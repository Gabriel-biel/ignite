import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import crypto from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function refeicoesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    console.log(`[${request.method}] ${request.url}`)
  })

  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const meals = await knex('refeicoes')
        .where('session_id', sessionId)
        .select()

      return reply.status(200).send(meals)
    },
  )

  app.get(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const getMealsParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { sessionId } = request.cookies

      const { id } = getMealsParamsSchema.parse(request.params)

      const meal = await knex('refeicoes')
        .where({
          session_id: sessionId,
          id,
        })
        .first()

      return reply.status(200).send({ meal })
    },
  )

  app.post(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const createRefeicaoBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        inDiet: z.boolean(),
        data: z.string(),
        hora: z.string(),
      })

      const sessionId = request.cookies.sessionId

      const { name, description, inDiet, data, hora } =
        createRefeicaoBodySchema.parse(request.body)

      await knex('refeicoes').insert({
        id: crypto.randomUUID(),
        session_id: sessionId,
        name,
        description,
        inDiet,
        data,
        hora,
      })

      return reply.status(201).send()
    },
  )

  app.patch(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const alterRefeicaoBodySchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        data: z.string().optional(),
        hora: z.string().optional(),
        inDiet: z.boolean().optional(),
      })

      const updateMealBodySchema = z.object({
        id: z.string().uuid(),
      })

      const { sessionId } = request.cookies
      const { id } = updateMealBodySchema.parse(request.params)
      const { name, description, data, hora, inDiet } =
        alterRefeicaoBodySchema.parse(request.body)

      await knex('refeicoes')
        .where({
          session_id: sessionId,
          id,
        })
        .update({
          name,
          description,
          data,
          hora,
          inDiet,
        })

      return reply.status(200).send({ message: 'Updated successfully' })
    },
  )

  app.delete(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const delRefeicaoId = z.object({
        id: z.string().nonempty(),
      })

      const { id } = delRefeicaoId.parse(request.params)
      const { sessionId } = request.cookies

      await knex('refeicoes')
        .where({
          session_id: sessionId,
          id,
        })
        .del()
        .catch(() => {
          return reply.status(400).send('Unauthorize action!')
        })

      return reply.status(200).send('Deleted successfully!')
    },
  )
}
