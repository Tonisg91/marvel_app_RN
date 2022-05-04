import React, { memo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { Comic } from './type'

interface Props {
  comic: Comic
}

function ComicCard({ comic }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${comic.thumbnail.path}.jpg` }}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {comic.title}
        </Text>
      </View>
    </View>
  )
}

export default memo(ComicCard)

const styles = StyleSheet.create({
  container: {
    maxWidth: 140,
    marginHorizontal: 10,
    backgroundColor: '#e63946',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 12
  },
  image: { width: 140, height: 170 },
  titleContainer: { padding: 9 },
  title: { color: '#fff', fontWeight: '700', fontSize: 16 }
})
