import { randomUUID } from 'node:crypto'
import { PetsRepository, SearchParams } from '../pets-repository'
import { Prisma, Pet } from '@prisma/client'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async searchPets(
    {
      city,
      age,
      behavior,
      energyLevel,
      requirements,
      sex,
      size,
      species,
    }: SearchParams,
    page: number,
  ) {
    let pets = this.pets.filter((pet) => pet.city === city)

    if (age) {
      pets = pets.filter((pet) => pet.age === age)
    }
    if (sex) {
      pets = pets.filter((pet) => pet.sex === sex)
    }
    if (energyLevel) {
      pets = pets.filter((pet) => pet.energy_level === energyLevel)
    }
    if (species) {
      pets = pets.filter((pet) => pet.species === species)
    }
    if (size) {
      pets = pets.filter((pet) => pet.size === size)
    }
    if (behavior) {
      pets = pets.filter((pet) => pet.behavior === behavior)
    }
    if (requirements) {
      pets = pets.filter((pet) => pet.requirements === requirements)
    }

    pets = pets.slice((page - 1) * 20, page * 20)

    return pets
  }

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
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
