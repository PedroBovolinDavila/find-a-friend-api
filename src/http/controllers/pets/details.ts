import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const getPetDetailsParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPetDetailsParamsSchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetDetailsUseCase()

  const { pet } = await getPetDetailsUseCase.execute({ id })

  return reply.status(200).send({
    pet,
  })
}
