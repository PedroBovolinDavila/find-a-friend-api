import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the details of a pet', async () => {
    const { token, orgId } = await createAndAuthenticateOrg(app)

    const pet = await prisma.pet.create({
      data: {
        name: 'Rex',
        age: 'ADULT',
        behavior: ['CALM', 'FRIENDLY'],
        city: 'Example City, BR',
        description: 'Rex description',
        energy_level: 'HIGH',
        requirements: ['requirement 1', 'requirement 2'],
        sex: 'MALE',
        size: 'MEDIUM',
        species: 'Dog',
        org_id: orgId,
      },
    })

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
    expect(response.body.pet.name).toEqual('Rex')
  })
})
