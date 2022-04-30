import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default function ListSpinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={90} color="#fff" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center'
  }
})
