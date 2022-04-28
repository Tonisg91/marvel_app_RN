import React, { useState } from 'react'
import { ImageBackground, StyleSheet, TextInput, View } from 'react-native'
import CustomButton from '../common/CustomButton'
import { useAuth } from './context'
import { AuthInput } from './type'

export default function Login() {
  const { login } = useAuth()
  const [values, setValues] = useState<AuthInput>({ email: '', password: '' })

  const handleChange = (field: string) => (value: string) =>
    setValues({ ...values, [field]: value })

  const handleSubmit = () => {
    // TODO: check values
    login(values)
  }

  return (
    <ImageBackground
      source={require('../../../assets/images/login-bg.jpg')}
      style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('email')}
          value={values.email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={handleChange('password')}
          value={values.password}
          secureTextEntry
          placeholder="Password"
        />
        <CustomButton text="Login" action={handleSubmit} />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    width: '60%',
    borderRadius: 15,
    elevation: 20,
    backgroundColor: '#fff',
    padding: 20
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  }
})
