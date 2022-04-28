import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { create, ApiResponse, ApiErrorResponse, ApiOkResponse } from 'apisauce'
import {
  MarvelApiResponse,
  MarvelHeroData,
  MarvelHeroesListResponse
} from '../type'

const api = create({
  baseURL: 'https://gateway.marvel.com/'
})

const apiAuth = {
  ts: 'redarborTechnicalInterview',
  apikey: '524febf52b043e8ddd735c5bbee162dd',
  hash: '63383cc4deb85692185eb6670bf4d20a'
}

export default function List() {
  const [heroes, setHeroes] = useState<MarvelHeroData>([])

  useEffect(() => {
    api.get('/v1/public/characters', apiAuth).then(res => {
      const apiResponse =
        res.data as MarvelApiResponse<MarvelHeroesListResponse>

      setHeroes(apiResponse.data.results)
    })
  }, [])

  return (
    <View>
      <Text>{JSON.stringify(heroes)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
