import connection from '../connection'

export async function addQuestion(
  userId: number,
  title: string,
  body: string,
  db = connection,
) {
  await db('questions')
    .insert({ user_id: userId, title: title, body: body })
    .returning('*')
}
