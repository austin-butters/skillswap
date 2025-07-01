export interface AddCodeFixData {
  userId: number
  title: string
  input: string
  output: string
}

export interface GetCodeFixData extends AddCodeFixData {
  id: number
}
