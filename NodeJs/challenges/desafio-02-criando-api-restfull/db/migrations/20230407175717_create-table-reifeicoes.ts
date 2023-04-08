import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('refeicoes', (table) => {
    table.uuid('id').primary()
    table.uuid('session_id').index()
    table.string('name').notNullable()
    table.string('description')
    table.timestamp('data')
    table.string('hora')
    table.boolean('inDiet').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('refeicoes')
}
