export interface UserProps {
  id?: number
  status?: string
  email: string
  password: string | null
  roleId: number | null
}
