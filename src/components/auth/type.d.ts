export interface User {
  email: string
  name: string
}

export interface AuthInput {
  email: string
  password: string
}

export const AuthInitState: Auth = {
  user: {
    email: '',
    name: ''
  },
  loading: true
}

export type AuthContextProps = {
  user: User | null
  loading: boolean
  login: (data: AuthInput) => void
  logout: () => void
}
