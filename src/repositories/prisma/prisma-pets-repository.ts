import { Prisma } from '@prisma/client'
import { PetsRepository, SearchParams } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async searchPets(searchParams: SearchParams, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        city: searchParams.city,
        species: searchParams.species,
        energy_level: searchParams.energyLevel,
        age: searchParams.age,
        sex: searchParams.sex,
        size: searchParams.size,
        ...(searchParams.behavior?.length !== 0 && {
          behavior: {
            hasSome: searchParams.behavior,
          },
        }),
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        org: true,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
