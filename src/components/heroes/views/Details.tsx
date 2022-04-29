import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParams } from '../Navigation'

interface Props
  extends NativeStackScreenProps<RootStackParams, 'Hero Details'> {}

export default function Details({ navigation, route }: Props) {
  console.log(route.params.name)
  return (
    <View>
      <Text>Details</Text>
    </View>
  )
}

// const styles = StyleSheet.create({})
