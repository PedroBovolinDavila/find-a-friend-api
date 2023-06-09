import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets', async () => {
    await petsRepository.create({
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
    await petsRepository.create({
      name: 'Rex',
      age: 'OLD',
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

    const { pets } = await sut.execute({
      searchParams: {
        city: 'Example City',
        age: 'OLD',
      },
      page: 1,
    })

    expect(pets.length).toEqual(1)
    expect(pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
      }),
    ])
  })
})
