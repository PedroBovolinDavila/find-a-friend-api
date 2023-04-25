import { FastifyReply, FastifyRequest } from 'fastify'

export async function ensureAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify()
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(401).send({
        message: err.message,
      })
    } else {
      return reply.status(401).send({
        message: 'Unauthorized.',
      })
    }
  }
}
