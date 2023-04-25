import { FastifyInstance } from 'fastify'
import { create } from './create'
import { details } from './details'
import { search } from './search'
import { ensureAuthenticated } from '@/http/middlewares/ensure-authenticated'
import { verifyOrgRole } from '@/http/middlewares/verify-org-role'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', ensureAuthenticated)

  app.post(
    '/pets',
    {
      onRequest: [verifyOrgRole('ADMIN')],
    },
    create,
  )

  app.get('/pets/search', search)
  app.get('/pets/:id', details)
}
