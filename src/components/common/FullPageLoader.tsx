import { ActivityIndicator, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'

export default function FullPageLoader() {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../../assets/images/list-bg.jpg')}>
      <ActivityIndicator size={70} color="#fff" />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
