import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Create Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Javascript Org',
      ownerName: 'John Doe',
      cep: '88888888',
      address: 'Av. Brazil',
      contactNumber: '999999999',
      email: 'johndoe@org.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
