import React from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native'

import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParams } from '../Navigation'
import ListSeparator from '../../common/ListSeparator'
import ComicCard from '../ComicCard'
import DescriptionHeader from '../DescriptionHeader'
import { Comic } from '../type'
import useComics from '../hooks/useComics'

interface Props
  extends NativeStackScreenProps<RootStackParams, 'Hero Details'> {}

export default function Details({ route }: Props) {
  const { ...hero } = route.params
  const { comics, loadMore } = useComics(hero.id)

  const imageUrl = `${hero.thumbnail.path}.${hero.thumbnail.extension}`

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../../../assets/images/hero-bg.jpg')}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="stretch"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{hero.name}</Text>
        </View>
      </View>
      <FlatList
        data={comics}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <ComicCard comic={item} />}
        numColumns={2}
        keyExtractor={(item: Comic) => item.id.toString()}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={() => (
          <DescriptionHeader description={hero.description} />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  imageContainer: {
    margin: 12
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 15
  },
  infoContainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center'
  },
  name: {
    fontWeight: '800',
    fontSize: 20,
    color: '#fff'
  },
  listContent: { flexGrow: 1, alignItems: 'center' }
})
