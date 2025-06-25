import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'

export function useAddQuestion() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (question: {
      userId: number
      title: string
      body: string
    }) => {
      const response = await request.post(`/api/v1/questions`).send(question)
      return response.body
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['questions'] }),
  })
}
