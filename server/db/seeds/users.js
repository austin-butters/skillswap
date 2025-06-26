export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      auth0_uid: 'auth0|1',
      email: 'testemail@gmail.com',
      name: 'Test name 1',
      bio: 'Test bio',
    },
  ])
}
