import React from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  FlatList
} from 'react-native'
import { useCachedRequests } from '../context/cachedProvider'
import ListSeparator from '../../common/ListSeparator'
import { CachedRequestsProvider } from '../context/cachedProvider'
import HeroCard from '../HeroCard'
import FullPageLoader from '../../common/FullPageLoader'

function List() {
  const [state, { paginate }] = useCachedRequests()
  const { url, data } = state

  if (!data) {
    return <FullPageLoader />
  }

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../../../assets/images/list-bg.jpg')}
      resizeMode="stretch">
      <FlatList
        data={data[url]}
        renderItem={({ item }) => <HeroCard hero={item} />}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={ListSeparator}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        onEndReached={paginate}
        onEndReachedThreshold={0.4}
        ListFooterComponent={<ActivityIndicator size={40} color="white" />}
      />
    </ImageBackground>
  )
}

export default function CachedList() {
  return (
    <CachedRequestsProvider
      maxResultsPerPage={30}
      url="https://gateway.marvel.com/v1/public/characters">
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
