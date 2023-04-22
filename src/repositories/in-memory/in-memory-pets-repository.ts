import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'
import { Prisma, Pet } from '@prisma/client'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      age: data.age,
      city: data.city,
      name: data.name,
      size: data.size,
      sex: data.sex,
      org_id: data.org_id,
      description: data.description,
      energy_level: data.energy_level,
      species: data.species,
      behavior: data.behavior,
      requirements: data.requirements,
    } as Pet

    this.pets.push(pet)

    return pet
  }
}
