import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { create } from 'apisauce'
import { getAuthQueryStringParams } from '../utils'
import { Character, Comic, DataContextProps, MarvelApiResponse } from '../type'
import {
  reducer,
  initialState,
  INITIAL_LOAD,
  LOAD_MORE_HEROES,
  LOAD_COMICS
} from './reducer'

const api = create({
  baseURL: 'https://gateway.marvel.com/',
  params: getAuthQueryStringParams()
})

// Context
const DataContext = createContext({} as DataContextProps)

// Hook
export const useData = () => useContext(DataContext)

// Provider
export function DataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const initialLoad = () => {
    api
      .get('/v1/public/characters', { limit: state.heroes.limit })
      .then(res => {
        const apiResponse = res.data as MarvelApiResponse<Character>

        dispatch({ type: INITIAL_LOAD, payload: apiResponse.data.results })
      })
  }

  const loadMoreHeroes = () => {
    api
      .get('/v1/public/characters', {
        offset: state.heroes.offset + 30
      })
      .then(res => {
        const apiResponse = res.data as MarvelApiResponse<Character>

        dispatch({ type: LOAD_MORE_HEROES, payload: apiResponse.data.results })
      })
  }

  const loadComics = (characterId: string) => {
    api
      .get(`/v1/public/characters/${characterId}/comics`, {
        limit: state.comics.limit
      })
      .then(res => {
        const apiResponse = res.data as MarvelApiResponse<Comic>

        dispatch({ type: LOAD_COMICS, payload: apiResponse.data.results })
      })
  }

  const loadMoreComics = (characterId: string) => {
    api
      .get(`/v1/public/characters/${characterId}/comics`, {
        offset: state.comics.offset + 30,
        limit: state.comics.limit
      })
      .then(res => {
        const apiResponse = res.data as MarvelApiResponse<Comic>

        dispatch({ type: LOAD_COMICS, payload: apiResponse.data.results })
      })
  }

  useEffect(() => {
    initialLoad()
  }, [])

  return (
    <DataContext.Provider
      value={{ data: state, loadMoreHeroes, loadComics, loadMoreComics }}>
      {children}
    </DataContext.Provider>
  )
}
