import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Character } from './type'

export default function HeroCard({ hero }: { hero: Character }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${hero.thumbnail.path}.${hero.thumbnail.extension}` }}
        style={styles.heroImage}
      />
      <View style={styles.heroNameContainer}>
        <Text style={styles.heroName} numberOfLines={1} ellipsizeMode="clip">
          {hero.name}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: '#e63946',
    overflow: 'hidden',
    elevation: 12,
    marginHorizontal: 12
  },
  heroImage: {
    width: 120,
    height: 120,
    resizeMode: 'stretch'
  },
  heroNameContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    maxWidth: 120
  },
  heroName: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18
  }
})
