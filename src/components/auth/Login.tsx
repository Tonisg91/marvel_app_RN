import React, { useState } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'

import Input from '../common/Input'
import { useAuth } from './context'
import { EMAIL_REGEX } from '../constants'
import { AuthErrors, AuthInput } from './type'
import CustomButton from '../common/CustomButton'

export default function Login() {
  const { login } = useAuth()

  const [values, setValues] = useState<AuthInput>({ email: '', password: '' })
  const [errors, setErrors] = useState<AuthErrors>({})

  const handleChange = (field: string) => (value: string) =>
    setValues({ ...values, [field]: value })

  const handleSubmit = async () => {
    if (!values.email || !values.password) return

    if (!EMAIL_REGEX.test(values.email)) {
      setErrors({ ...errors, email: 'Bad email format.' })
      return
    }

    const responseError = await login(values)
    if (responseError) {
      setErrors(responseError)
    }
  }

  return (
    <ImageBackground
      source={require('../../../assets/images/login-bg.jpg')}
      style={styles.container}>
      <View style={styles.form}>
        <Input
          error={errors.email}
          onChangeText={handleChange('email')}
          value={values.email}
          placeholder="Email"
        />
        <Input
          error={errors.password}
          onChangeText={handleChange('password')}
          value={values.password}
          placeholder="Password"
          secureTextEntry
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
