import { AddCodeFixData, UserId } from '#models'
import db from '../connection'

export async function addAiFix(postData: AddCodeFixData) {
  await db('codefixes').insert({
    user_id: postData.userId,
    title: postData.title,
    input: postData.input,
    output: postData.output,
  })
}

export async function aiFixesFromUserId(userId: UserId) {
  return await db('codefixes').where({ user_id: userId }).select()
}
