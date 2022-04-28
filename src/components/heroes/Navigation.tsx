import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Details from './views/Details'
import List from './views/List'

const Stack = createNativeStackNavigator()

export default function HeroNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Home" component={List} />
      <Stack.Screen name="Hero Details" component={Details} />
    </Stack.Navigator>
  )
}
