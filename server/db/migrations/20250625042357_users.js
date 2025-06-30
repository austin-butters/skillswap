/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('auth0_uid').notNullable().unique()
    table.string('email').notNullable().unique()
    table.string('name').notNullable()
    table.string('bio')
    table
      .string('profile_picture')
      .notNullable()
      .defaultTo('/images/butters.webp')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('users')
}
