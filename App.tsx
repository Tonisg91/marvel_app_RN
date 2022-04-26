import React from 'react'
import { StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import HeroNavigation from './src/components/heroes/Navigation'

export default function App() {
  return (
    <NavigationContainer>
      <HeroNavigation />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
