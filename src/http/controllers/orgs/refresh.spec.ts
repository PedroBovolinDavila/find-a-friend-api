import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Javascript Org',
      ownerName: 'John Doe',
      cep: '88888888',
      address: 'Av. Brazil',
      contactNumber: '999999999',
      email: 'johndoe@org.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@org.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body.token).toEqual(expect.any(String))
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
