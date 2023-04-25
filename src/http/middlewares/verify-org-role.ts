import { Role } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyOrgRole(roleToVerify: Role) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const orgRole = request.user.role

    if (orgRole !== roleToVerify) {
      return reply.status(401).send({
        message: 'You do not have permissions to access this features.',
      })
    }
  }
}
