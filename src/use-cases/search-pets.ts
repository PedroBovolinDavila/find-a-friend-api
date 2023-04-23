import { PetsRepository, SearchParams } from '@/repositories/pets-repository'

interface FetchPetsByCityUseCaseParams {
  searchParams: SearchParams
  page: number
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ searchParams, page }: FetchPetsByCityUseCaseParams) {
    const pets = await this.petsRepository.fetchManyByCity(searchParams, page)

    // TODO: Criar testes

    return {
      pets,
    }
  }
}
