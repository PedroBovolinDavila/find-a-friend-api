import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'
import { Prisma, Pet } from '@prisma/client'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async fetchManyByCity(city: string, page: number) {
    const pets = this.pets
      .filter((pet) => pet.city === city)
      .slice((page - 1) * 20, page * 20)

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
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
