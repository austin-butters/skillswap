import { AddCodeFixData } from '#models'
import db from '../connection'

export async function addAiFix(postData: AddCodeFixData) {
  await db('codeFixes').insert({
    user_id: postData.userId,
    title: postData.title,
    input: postData.input,
    output: postData.output,
  })
}
