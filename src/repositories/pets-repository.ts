import {
  Prisma,
  Pet,
  EnergyLevel,
  Age,
  Sex,
  Size,
  Behavior,
  Org,
} from '@prisma/client'

export interface SearchParams {
  city: string
  species?: string
  energyLevel?: EnergyLevel
  age?: Age
  sex?: Sex
  size?: Size
  behavior?: Behavior[]
}

export interface PetsRepository {
  searchPets(searchParams: SearchParams, page: number): Promise<Pet[]>
  findById(id: string): Promise<(Pet & { org?: Org }) | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
