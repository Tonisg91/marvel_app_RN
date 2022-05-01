import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import Login from './src/components/auth/Login'
import { DataProvider } from './src/components/heroes/context'
import HeroNavigation from './src/components/heroes/Navigation'
import { AuthProvider, useAuth } from './src/components/auth/context'
import FullPageLoader from './src/components/common/FullPageLoader'
import SettingsModal, {
  ModalOpener
} from './src/components/common/SettingsModal'

function AppState({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DataProvider maxItemsPerPage={30}>{children}</DataProvider>
    </AuthProvider>
  )
}

function Navigation() {
  const { loading, user, ...auth } = useAuth()
  const [modalVisible, setModalVisible] = useState(false)

  const closeModal = () => setModalVisible(false)
  const openModal = () => setModalVisible(true)

  const logout = () => {
    closeModal()
    auth.logout()
  }

  if (loading) {
    return <FullPageLoader />
  }

  if (!user) {
    return <Login />
  }

  return (
    <NavigationContainer>
      <SettingsModal {...{ logout, closeModal, modalVisible }} />
      <HeroNavigation />
      <ModalOpener {...{ openModal }} />
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
