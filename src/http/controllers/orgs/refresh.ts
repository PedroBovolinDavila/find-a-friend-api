import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({
    onlyCookie: true,
  })

  const { user: org } = request

  const token = await reply.jwtSign(
    {
      role: org.role,
    },
    {
      sign: {
        sub: org.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {
      role: org.role,
    },
    {
      sign: {
        sub: org.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: true,
    })
    .status(200)
    .send({
      token,
    })
}
