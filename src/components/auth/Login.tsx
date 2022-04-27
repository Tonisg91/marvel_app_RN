import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from './context'

export default function Login() {
  const { login } = useAuth()
  login({ email: 'asd', password: 'ads' })
  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
