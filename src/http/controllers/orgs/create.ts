import { EmailAlredyInUseError } from '@/use-cases/errors/email-alredy-in-use-error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    ownerName: z.string(),
    cep: z.string().max(8),
    address: z.string(),
    contactNumber: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  try {
    const data = createOrgBodySchema.parse(request.body)

    const createOrgUseCase = makeCreateOrgUseCase()

    await createOrgUseCase.execute(data)

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof EmailAlredyInUseError) {
      return reply.status(209).send({
        message: err.message,
      })
    }

    throw err
  }
}
