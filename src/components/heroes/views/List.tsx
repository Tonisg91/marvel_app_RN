import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { create } from 'apisauce'

const api = create({
  baseURL: 'https://gateway.marvel.com/'
})

const apiAuth = {
  ts: 'redarborTechnicalInterview',
  apikey: '524febf52b043e8ddd735c5bbee162dd',
  hash: '63383cc4deb85692185eb6670bf4d20a'
}

export default function List() {
  const [heroes, setHeroes] = useState([])

  useEffect(() => {
    api.get('/v1/public/characters', apiAuth).then(res => {
      console.log(Object.keys(res.data.data))
    })
  }, [])

  return (
    <View>
      <Text>{JSON.stringify(heroes)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
