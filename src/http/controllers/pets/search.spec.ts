import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server)
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Anna',
        age: 'ADULT',
        behavior: ['CALM', 'FRIENDLY'],
        city: 'Example City, BR',
        description: 'Rex description',
        energyLevel: 'HIGH',
        requirements: ['requirement 1', 'requirement 2'],
        sex: 'FEMALE',
        size: 'MEDIUM',
        species: 'Dog',
      })

    const response = await request(app.server)
      .get('/pets/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        city: 'Example City, BR',
        page: 1,
        sex: 'FEMALE',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
      }),
    ])
    expect(response.body.pets[0].name).toEqual('Anna')
  })
})
