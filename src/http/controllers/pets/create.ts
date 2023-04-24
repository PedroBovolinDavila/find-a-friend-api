import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    species: z.string(),
    city: z.string(),
    requirements: z.array(z.string()),
    energyLevel: z.enum(['LOW', 'MODERATE', 'HIGH']),
    age: z.enum(['PUPPY', 'ADULT', 'OLD']),
    sex: z.enum(['MALE', 'FEMALE']),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    behavior: z.array(
      z.enum(['FRIENDLY', 'SOCIABLE', 'CALM', 'AGITATED', 'ANGRY', 'NERVOUS']),
    ),
    orgId: z.string().uuid(),
  })

  const data = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute(data)

  return reply.status(201).send()
}
