export class EmailAlredyInUseError extends Error {
  constructor() {
    super('Email alredy in use.')
  }
}
