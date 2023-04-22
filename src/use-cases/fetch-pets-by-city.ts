import { PetsRepository } from '@/repositories/pets-repository'

interface FetchPetsByCityUseCaseParams {
  city: string
  page: number
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city, page }: FetchPetsByCityUseCaseParams) {
    const pets = await this.petsRepository.fetchManyByCity(city, page)

    return {
      pets,
    }
  }
}
