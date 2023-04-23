import { OrgsRepository } from '@/repositories/orgs-repository'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credencials-error'

interface AuthenticateUseCaseParams {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ email, password }: AuthenticateUseCaseParams) {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const isPasswordCorrectly = await compare(password, org.password_hash)

    if (!isPasswordCorrectly) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
