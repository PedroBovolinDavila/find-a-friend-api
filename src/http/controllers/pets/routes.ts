import { FastifyInstance } from 'fastify'
import { create } from './create'
import { details } from './details'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', create)

  app.get('/pets/search', search)
  app.get('/pets/:id', details)
}
