import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const { id } = await prisma.org.create({
    data: {
      name: 'Javascript Org',
      owner_name: 'John Doe',
      cep: '88888888',
      address: 'Av. Brazil',
      contact_number: '999999999',
      email: 'johndoe@org.com',
      password_hash: await hash('123456', 6),
      role: 'ADMIN',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@org.com',
    password: '123456',
  })

  return {
    orgId: id,
    token: authResponse.body.token,
  }
}
