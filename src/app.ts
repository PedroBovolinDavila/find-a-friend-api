import fastify from 'fastify'
import { ZodError } from 'zod'
import { ResourceNotFoundError } from './use-cases/errors/resource-not-found-error'
import { petsRoutes } from './http/controllers/pets/routes'
import { orgsRoutes } from './http/controllers/orgs/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(petsRoutes)
app.register(orgsRoutes)

app.setErrorHandler((error, requries, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: error.format(),
    })
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(404).send({
      message: error.message,
    })
  }

  if (env.NODE_ENV === 'dev') {
    console.log(error.message)
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
