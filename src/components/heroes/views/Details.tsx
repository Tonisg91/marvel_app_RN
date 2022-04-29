import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  AppRegistry,
  ImageBackground
} from 'react-native'

import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParams } from '../Navigation'
import ListSeparator from '../../common/ListSeparator'
import { useData } from '../context'
import ComicCard from '../ComicCard'
import DescriptionHeader from '../DescriptionHeader'

interface Props
  extends NativeStackScreenProps<RootStackParams, 'Hero Details'> {}

export default function Details({ route }: Props) {
  const [state, setState] = useState([])
  const data = useData()
  const { ...hero } = route.params
  const imageUrl = `${hero.thumbnail.path}.${hero.thumbnail.extension}`

  const { comics } = hero

  useEffect(() => {
    const endpoint = comics.collectionURI.slice(
      comics.collectionURI.indexOf('.com') + 4
    )

    data.api.get(endpoint).then(res => {
      console.log(Object.keys(res.data.data))
      setState(res.data.data.results)
    })
  }, [])

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../../../assets/images/hero-bg.jpg')}>
      <View style={{ margin: 12 }}>
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
        data={state}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <ComicCard comic={item} />}
        numColumns={2}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={() => (
          <DescriptionHeader description={hero.description} />
        )}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
