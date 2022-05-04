import React from 'react'
import { StyleSheet, Text, TextInput, View, TextInputProps } from 'react-native'

interface Props extends TextInputProps {
  onChangeText: (value: string) => void
  error?: string
}

export default function Input({ error, ...props }: Props) {
  return (
    <View>
      <TextInput style={styles.input} {...props} />
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    fontWeight: '700'
  },
  errorMessage: {
    color: '#e63946',
    paddingLeft: 15
  }
})
