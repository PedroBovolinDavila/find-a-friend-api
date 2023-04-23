import { PetsRepository, SearchParams } from '@/repositories/pets-repository'

interface SearchPetsUseCaseParams {
  searchParams: SearchParams
  page: number
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ searchParams, page }: SearchPetsUseCaseParams) {
    const pets = await this.petsRepository.searchPets(searchParams, page)

    return {
      pets,
    }
  }
}
