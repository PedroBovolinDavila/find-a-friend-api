import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetDetailsUseCaseParams {
  id: string
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetDetailsUseCaseParams) {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError('Pet')
    }

    Reflect.deleteProperty(pet.org!, 'password_hash')
    Reflect.deleteProperty(pet, 'org_id')

    return {
      pet,
    }
  }
}
