import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContextProps, AuthInput, User } from './type'

import FakeUsers from '../../seeds.json'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext({} as AuthContextProps)

// Hook
export const useAuth = () => useContext(AuthContext)

function storeUser(user: User) {
  AsyncStorage.setItem('user', JSON.stringify(user))
}

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const loadUser = async () => {
    const cachedUser = await AsyncStorage.getItem('user')

    if (!cachedUser) {
      setLoading(false)
      return
    }

    setUser(JSON.parse(cachedUser))
    setLoading(false)
  }

  const login = async ({ email, password }: AuthInput) => {
    FakeUsers.find(user => {
      if (user.email === email && user.password === password) {
        const { password, ...userData } = user
        setUser(userData)
        storeUser(userData)
      }
    })
  }

  const logout = () => setUser(null)

  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
