import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import Login from './src/components/auth/Login'
import { DataProvider } from './src/components/heroes/context'
import HeroNavigation from './src/components/heroes/Navigation'
import { AuthProvider, useAuth } from './src/components/auth/context'
import FullPageLoader from './src/components/common/FullPageLoader'

function AppState({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DataProvider maxItemsPerPage={30}>{children}</DataProvider>
    </AuthProvider>
  )
}

function Navigation() {
  const { loading, user } = useAuth()

  if (loading) {
    return <FullPageLoader />
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
