import { OrgsRepository } from '@/repositories/orgs-repository'
import { EmailAlredyInUseError } from './errors/email-alredy-in-use-error'
import { hash } from 'bcryptjs'

interface CreateOrgUseCaseParams {
  name: string
  address: string
  cep: string
  contactNumber: string
  email: string
  ownerName: string
  password: string
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    address,
    cep,
    contactNumber,
    email,
    name,
    ownerName,
    password,
  }: CreateOrgUseCaseParams) {
    const emailAlredyInUse = await this.orgsRepository.findByEmail(email)

    if (emailAlredyInUse) {
      throw new EmailAlredyInUseError()
    }

    const passwordHash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      address,
      cep,
      contact_number: contactNumber,
      email,
      name,
      owner_name: ownerName,
      password_hash: passwordHash,
    })

    return {
      org,
    }
  }
}
