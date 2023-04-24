import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get the details of an pet', async () => {
    const createdPet = await petsRepository.create({
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
    })

    const { pet } = await sut.execute({
      id: createdPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toBe('Rex')
  })

  it('should not be able to get the details of an inexistent pet', async () => {
    await expect(() =>
      sut.execute({
        id: 'inexistent-pet-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
