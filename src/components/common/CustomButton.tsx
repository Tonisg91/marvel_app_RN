import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface Props {
  text: string
  action: () => void
}

export default function CustomButton({ text, action }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={action}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#e63946',
    paddingVertical: 7,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginTop: 10
  },
  buttonText: {
    fontWeight: '700',
    color: '#fff'
  }
})
