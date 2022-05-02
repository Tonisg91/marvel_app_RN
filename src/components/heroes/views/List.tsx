import React from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  FlatList
} from 'react-native'
import { useCachedRequests } from '../../../../PruebaTecnicaProxyProvider'
import ListSeparator from '../../common/ListSeparator'
import ListSpinner from '../../common/ListSpinner'
import { CachedRequestsProvider } from '../context/cachedProvider'
import HeroCard from '../HeroCard'

function List() {
  const state = useCachedRequests()
  console.log(state)

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../../../assets/images/list-bg.jpg')}
      resizeMode="stretch">
      {/* {loading ? (
        <ListSpinner />
      ) : (
        <FlatList
          data={heroes.results}
          renderItem={({ item }) => <HeroCard hero={item} />}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={ListSeparator}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          onEndReached={loadMoreHeroes}
          onEndReachedThreshold={0.4}
          ListFooterComponent={<ActivityIndicator size={40} color="white" />}
        />
      )} */}
    </ImageBackground>
  )
}

export default function CachedList() {
  return (
    <CachedRequestsProvider
      maxResultsPerPage={30}
      url="https://gateway.marvel.com//v1/public/characters">
      <List />
    </CachedRequestsProvider>
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
