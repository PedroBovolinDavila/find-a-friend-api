import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface PetDetailsUseCaseParams {
  id: string
}

export class PetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: PetDetailsUseCaseParams) {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError('Pet')
    }

    return {
      pet,
    }
  }
}
