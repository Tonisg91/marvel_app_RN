import React from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  FlatList
} from 'react-native'

import HeroCard from '../HeroCard'
import ListSeparator from '../../common/ListSeparator'
import FullPageLoader from '../../common/FullPageLoader'
import { useCachedRequests, CachedRequestsProvider } from '../context'

function HeroList() {
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
        data={data[url].results}
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
      <HeroList />
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
