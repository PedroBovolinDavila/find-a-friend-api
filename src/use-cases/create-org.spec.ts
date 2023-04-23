import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgUseCase } from './create-org'
import { EmailAlredyInUseError } from './errors/email-alredy-in-use-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a org', async () => {
    const { org } = await sut.execute({
      name: 'Example Org',
      address: 'Rua Brasil',
      cep: '99999999',
      contactNumber: '999999999',
      email: 'org@example.com',
      ownerName: 'John Doe',
      password: '123456',
    })

    expect(org).toHaveProperty('id')
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create a org with same email', async () => {
    await sut.execute({
      name: 'Example Org',
      address: 'Rua Brasil',
      cep: '99999999',
      contactNumber: '999999999',
      email: 'org@example.com',
      ownerName: 'John Doe',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Example Org 2',
        address: 'Rua Brasil 2',
        cep: '99999999',
        contactNumber: '999999999',
        email: 'org@example.com',
        ownerName: 'John Doe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(EmailAlredyInUseError)
  })
})
