import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  fetchManyByCity(city: string, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
