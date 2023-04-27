import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Rex',
        age: 'ADULT',
        behavior: ['CALM', 'FRIENDLY'],
        city: 'Example City, BR',
        description: 'Rex description',
        energyLevel: 'HIGH',
        requirements: ['requirement 1', 'requirement 2'],
        sex: 'MALE',
        size: 'MEDIUM',
        species: 'Dog',
      })

    expect(response.statusCode).toEqual(201)
  })
})
