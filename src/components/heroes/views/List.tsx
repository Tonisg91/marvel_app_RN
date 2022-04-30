import React from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  FlatList,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ListSeparator from '../../common/ListSeparator'
import ListSpinner from '../../common/ListSpinner'
import { useData } from '../context'
import HeroCard from '../HeroCard'

export default function List() {
  const { data, loadMoreHeroes } = useData()
  const { fetching, heroes } = data

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={styles.container}
        source={require('../../../../assets/images/list-bg.jpg')}
        resizeMode="stretch">
        {fetching ? (
          <ListSpinner />
        ) : (
          <FlatList
            data={heroes.data}
            renderItem={({ item }) => <HeroCard hero={item} />}
            numColumns={2}
            keyExtractor={item => item.id.toString(36)}
            ItemSeparatorComponent={ListSeparator}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            onEndReached={loadMoreHeroes}
            onEndReachedThreshold={0.6}
            ListFooterComponent={<ActivityIndicator size={40} color="white" />}
          />
        )}
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
    paddingTop: 20
  }
})
