import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../auth/context'

export default function List() {
  const { logout } = useAuth()
  return (
    <View>
      <Text>List</Text>
      <Button title="logout" onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({})
