/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('meetings', (table) => {
    table.increments('id').primary()
    table.boolean('public')
    table.integer('host_id')
    table.string('title')
    table.string('url')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('meetings')
}
