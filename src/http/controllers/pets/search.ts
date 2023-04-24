import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { Behavior } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    page: z.coerce.number(),
    species: z.string().optional(),
    energyLevel: z.enum(['LOW', 'MODERATE', 'HIGH']).optional(),
    age: z.enum(['PUPPY', 'ADULT', 'OLD']).optional(),
    sex: z.enum(['MALE', 'FEMALE']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
    behavior: z.coerce.string().transform((behavior) => {
      if (behavior === 'undefined') {
        return []
      } else {
        return behavior.split(',')
      }
    }),
  })

  const { page, behavior, ...searchParams } = searchPetsQuerySchema.parse(
    request.query,
  )

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    page,
    searchParams: {
      ...searchParams,
      behavior: behavior as Behavior[],
    },
  })

  return reply.status(200).send({ pets })
}
