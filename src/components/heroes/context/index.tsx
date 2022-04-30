import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { create } from 'apisauce'
import { getAuthQueryStringParams } from '../utils'
import {
  Character,
  DataContextProps,
  MarvelApiResponse,
  MarvelComic,
  MarvelComicData,
  MarvelHeroData
} from '../type'
import {
  reducer,
  initialState,
  INITIAL_LOAD,
  LOAD_MORE_HEROES,
  LOAD_COMICS,
  FETCH_MORE,
  LOAD_MORE_COMICS
} from './reducer'

const api = create({
  baseURL: 'https://gateway.marvel.com/',
  params: getAuthQueryStringParams()
})

// Context
const DataContext = createContext({} as DataContextProps)

// Hook
export const useData = () => useContext(DataContext)

interface Props {
  children: React.ReactNode
  maxItemsPerPage: number
}

// Provider
export function DataProvider({ children, maxItemsPerPage = 20 }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const initialLoad = () => {
    api
      .get('/v1/public/characters', { limit: state.heroes.limit })
      .then(res => {
        const apiResponse = res.data as MarvelApiResponse<Character>

        dispatch({ type: INITIAL_LOAD, payload: apiResponse.data })
      })
  }

  const loadMoreHeroes = () => {
    api
      .get('/v1/public/characters', {
        offset: state.heroes.offset + 30
      })
      .then(res => {
        const apiResponse = res.data as MarvelApiResponse<MarvelHeroData>

        dispatch({ type: LOAD_MORE_HEROES, payload: apiResponse.data.results })
      })
      .catch(console.error)
  }

  const loadComics = (characterId: number) => {
    api
      .get(`/v1/public/characters/${characterId}/comics`, {
        limit: 20
      })
      .then(res => {
        const apiResponse = res.data as MarvelApiResponse<MarvelComicData>

        const payload: MarvelComic = {
          id: characterId,
          data: apiResponse.data
        }

        dispatch({ type: LOAD_COMICS, payload })
      })
      .catch(console.error)
  }

  const loadMoreComics = (characterId: number, offset: number) => {
    console.log('LOAD MORE COMICS')
    api
      .get(`/v1/public/characters/${characterId}/comics`, { offset })
      .then(res => {
        const apiResponse = res.data as MarvelApiResponse<MarvelComicData>

        const payload: MarvelComic = {
          id: characterId,
          data: apiResponse.data
        }

        dispatch({ type: LOAD_MORE_COMICS, payload })
      })
  }

  useEffect(() => {
    initialLoad()
  }, [])

  return (
    <DataContext.Provider
      value={{
        data: state,
        loadMoreHeroes,
        loadComics,
        loadMoreComics
      }}>
      {children}
    </DataContext.Provider>
  )
}
