import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContextProps, AuthInput, User } from './type'

import FakeUsers from '../../seeds.json'
import AsyncStorage from '@react-native-async-storage/async-storage'

const USER = 'user'

// Context
const AuthContext = createContext({} as AuthContextProps)

// Hook
export const useAuth = () => useContext(AuthContext)

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const loadUser = async () => {
    const cachedUser = await AsyncStorage.getItem(USER)

    if (!cachedUser) {
      setLoading(false)
      return
    }

    setUser(JSON.parse(cachedUser))
    setLoading(false)
  }

  const login = async ({ email, password }: AuthInput) => {
    const foundUser = FakeUsers.find(u => u.email === email)

    if (!foundUser) {
      console.warn('User not found.')
      return
    }

    if (foundUser.password !== password) {
      console.warn('Password does not match.')
      return
    }

    const userData = { email: foundUser.email, name: foundUser.name }

    await AsyncStorage.setItem(USER, JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    AsyncStorage.removeItem(USER)
      .then(() => setUser(null))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
