import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credencials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'Example Org',
      address: 'Rua Brasil',
      cep: '99999999',
      contact_number: '999999999',
      email: 'org@example.com',
      owner_name: 'John Doe',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'org@example.com',
      password: '123456',
    })

    expect(org).toHaveProperty('id')
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with incorrect email', async () => {
    await orgsRepository.create({
      name: 'Example Org',
      address: 'Rua Brasil',
      cep: '99999999',
      contact_number: '999999999',
      email: 'org@example.com',
      owner_name: 'John Doe',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'incorrect-email@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with incorrect password', async () => {
    await orgsRepository.create({
      name: 'Example Org',
      address: 'Rua Brasil',
      cep: '99999999',
      contact_number: '999999999',
      email: 'org@example.com',
      owner_name: 'John Doe',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'org@example.com',
        password: 'incorrect-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
