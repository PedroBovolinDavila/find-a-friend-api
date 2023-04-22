import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'
import { Prisma } from '@prisma/client'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByCityUseCase

const examplePet = {
  name: 'Rex',
  age: 'ADULT',
  behavior: ['CALM', 'FRIENDLY'],
  city: 'Example City',
  description: 'Rex description',
  energy_level: 'HIGH',
  org_id: 'Organization-id',
  requirements: ['requirement 1', 'requirement 2'],
  sex: 'MALE',
  size: 'MEDIUM',
  species: 'Dog',
} as Prisma.PetUncheckedCreateInput

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCityUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    petsRepository.create(examplePet)
    petsRepository.create(examplePet)

    const { pets } = await sut.execute({
      city: 'Example City',
      page: 1,
    })

    expect(pets.length).toEqual(2)
    expect(pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
      }),
      expect.objectContaining({
        id: expect.any(String),
      }),
    ])
  })
})
