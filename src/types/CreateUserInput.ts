export interface CreateUserInput {
  fullName: string
  email: string
  password: string
  phone?: string
  document: string
  profilePictureUri?: string
}
