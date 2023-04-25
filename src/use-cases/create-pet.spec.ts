import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
    const org = await orgsRepository.create({
      name: 'Example Org',
      address: 'Rua Brasil',
      cep: '99999999',
      contact_number: '999999999',
      email: 'org@example.com',
      owner_name: 'John Doe',
      password_hash: '123456',
    })

    const { pet } = await sut.execute({
      name: 'Rex',
      age: 'ADULT',
      behavior: ['CALM', 'FRIENDLY'],
      city: 'Example City, BR',
      description: 'Rex description',
      energyLevel: 'HIGH',
      orgId: org.id,
      requirements: ['requirement 1', 'requirement 2'],
      sex: 'MALE',
      size: 'MEDIUM',
      species: 'Dog',
    })

    expect(pet).toHaveProperty('id')
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet in a non-existent org', async () => {
    await expect(() =>
      sut.execute({
        name: 'Rex',
        age: 'ADULT',
        behavior: ['CALM', 'FRIENDLY'],
        city: 'Example City, BR',
        description: 'Rex description',
        energyLevel: 'HIGH',
        orgId: 'non-existent-org-id',
        requirements: ['requirement 1', 'requirement 2'],
        sex: 'MALE',
        size: 'MEDIUM',
        species: 'Dog',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
