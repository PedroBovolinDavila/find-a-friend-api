import {
  Prisma,
  Pet,
  EnergyLevel,
  Age,
  Sex,
  Size,
  Behavior,
} from '@prisma/client'

export interface SearchParams {
  city: string
  species?: string
  requirements?: string[]
  energyLevel?: EnergyLevel
  age?: Age
  sex?: Sex
  size?: Size
  behavior?: Behavior[]
}

export interface PetsRepository {
  fetchManyByCity(searchParams: SearchParams, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
