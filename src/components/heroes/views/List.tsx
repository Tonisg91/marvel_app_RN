import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { create, ApiResponse, ApiErrorResponse, ApiOkResponse } from 'apisauce'
import {
  MarvelApiResponse,
  MarvelHeroData,
  MarvelHeroesListResponse
} from '../type'
import { getAuthQueryStringParams } from '../utils'
import { useData } from '../context'

const api = create({
  baseURL: 'https://gateway.marvel.com/',
  params: getAuthQueryStringParams()
})

export default function List() {
  const { data } = useData()

  return (
    <View>
      {data.map(hero => (
        <Text key={hero.name}>{hero.name}</Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({})
