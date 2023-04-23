import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { EnergyLevel, Age, Sex, Size, Behavior } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseParams {
  name: string
  description: string
  species: string
  city: string
  requirements: string[]
  energyLevel: EnergyLevel
  age: Age
  sex: Sex
  size: Size
  behavior: Behavior[]
  orgId: string
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    age,
    behavior,
    city,
    description,
    energyLevel,
    name,
    orgId,
    requirements,
    sex,
    size,
    species,
  }: CreatePetUseCaseParams) {
    const orgExists = await this.orgsRepository.findById(orgId)

    if (!orgExists) {
      throw new ResourceNotFoundError('Org')
    }

    const pet = await this.petsRepository.create({
      age,
      behavior,
      city,
      description,
      energy_level: energyLevel,
      name,
      org_id: orgId,
      requirements,
      sex,
      size,
      species,
    })

    return {
      pet,
    }
  }
}
