import connection from '../connection'

interface question {
  userId: number
  title: string
  body: string
}

export async function addQuestion(question: question, db = connection) {
  await db('questions')
    .insert({
      user_id: question.userId,
      title: question.title,
      body: question.body,
    })
    .returning('*')
}
