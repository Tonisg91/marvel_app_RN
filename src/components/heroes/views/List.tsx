import React from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ListSeparator from '../../common/ListSeparator'
import { useData } from '../context'
import HeroCard from '../HeroCard'

export default function List() {
  const { data } = useData()

  if (!data.length) return <ActivityIndicator />
  const hero = data[0]
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={styles.container}
        source={require('../../../../assets/images/list-bg.jpg')}
        resizeMode="stretch">
        <FlatList
          data={data}
          renderItem={({ item }) => <HeroCard hero={item} />}
          numColumns={2}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={ListSeparator}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  list: {
    paddingVertical: 20
  }
})
