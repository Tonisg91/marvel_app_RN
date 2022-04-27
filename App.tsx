import React from 'react'
import { StyleSheet, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import HeroNavigation from './src/components/heroes/Navigation'
import { AuthProvider, useAuth } from './src/components/auth/context'
import Login from './src/components/auth/Login'

function AppState({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}

function Navigation() {
  const { loading, user } = useAuth()

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (!user) {
    return <Login />
  }

  return (
    <NavigationContainer>
      <HeroNavigation />
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AppState>
      <Navigation />
    </AppState>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
