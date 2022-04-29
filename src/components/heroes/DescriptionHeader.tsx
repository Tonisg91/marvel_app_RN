import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface Props {
  description: string
}

export default function DescriptionHeader({ description }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e63946',
    borderRadius: 15,
    marginBottom: 25,
    marginTop: 10
  },
  description: {
    fontWeight: '700',
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20
  }
})
