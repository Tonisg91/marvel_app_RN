import React from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  FlatList
} from 'react-native'
import ListSeparator from '../../common/ListSeparator'
import ListSpinner from '../../common/ListSpinner'
import { useData } from '../context'
import HeroCard from '../HeroCard'

export default function List() {
  const { data, loadMoreHeroes } = useData()
  const { loading, heroes } = data

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../../../assets/images/list-bg.jpg')}
      resizeMode="stretch">
      {loading ? (
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
      )}
    </ImageBackground>
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
