import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Details from './views/Details'
import HeroList from './views/HeroList'
import { Character } from './type'

export type RootStackParams = {
  Home: undefined
  'Hero Details': {
    hero: Character
  }
}

const Stack = createNativeStackNavigator<RootStackParams>()

export default function HeroNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Home" component={HeroList} />
      <Stack.Screen name="Hero Details" component={Details} />
    </Stack.Navigator>
  )
}
