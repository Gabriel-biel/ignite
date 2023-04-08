// eslint-disable-next-line
import { kenx } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    refeicoes: {
      id: string
      session_id?: string
      name: string
      description: string
      inDiet: boolean
      data: string
      hora: string
    }

    users: {
      id: string
      session_id: string
      name: string
      createdAt: Date
    }
  }
}
