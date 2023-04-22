import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let usersRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(usersRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Rex',
      age: 'ADULT',
      behavior: ['CALM', 'FRIENDLY'],
      city: 'Example City, BR',
      description: 'Rex description',
      energyLevel: 'HIGH',
      orgId: 'Organization-id',
      requirements: ['requirement 1', 'requirement 2'],
      sex: 'MALE',
      size: 'MEDIUM',
      species: 'Dog',
    })

    expect(pet).toHaveProperty('id')
    expect(pet.id).toEqual(expect.any(String))
  })
})
