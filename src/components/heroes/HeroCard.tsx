import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/Ionicons'

import { Character } from './type'
import { RootStackParams } from './Navigation'

export default function HeroCard({ hero }: { hero: Character }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

  const goDetails = () => navigation.navigate('Hero Details', hero)

  return (
    <TouchableOpacity style={styles.container} onPress={goDetails}>
      <Image
        source={{ uri: `${hero.thumbnail.path}.${hero.thumbnail.extension}` }}
        style={styles.heroImage}
        resizeMode="stretch"
      />
      <View style={styles.heroNameContainer}>
        <Text
          style={[styles.heroName, styles.text]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {hero.name}
        </Text>
        <View style={styles.infoContainer}>
          <Text style={[styles.apparitionNumber, styles.text]}>
            {hero.comics.available}
          </Text>
          <Icon name="book-outline" color="white" size={20} />
        </View>
      </View>
    </TouchableOpacity>
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
  text: {
    color: '#fff',
    fontWeight: '700'
  },
  heroImage: {
    width: 150,
    height: 120
  },
  heroNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 150
  },
  heroName: {
    fontSize: 18,
    paddingVertical: 10
  },
  infoContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    paddingRight: 15,
    paddingBottom: 5
  },
  apparitionNumber: { paddingRight: 4 }
})
