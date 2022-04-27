import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContextProps, User } from './type'

import FakeUsers from '../../seeds.json'

const AuthContext = createContext({} as AuthContextProps)

// Hook
export const useAuth = () => useContext(AuthContext)

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const loadUser = async () => {
    // TODO: Load user from storage
  }

  const login = async ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {
    FakeUsers.find(user => {
      console.log({ user })
      if (user.email === email && user.password === password) {
        const { password, ...userData } = user
        setUser(userData)
        return true
      }
    })
    // TODO: Login user
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
