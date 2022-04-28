import React, { createContext, useContext, useEffect, useState } from 'react'
import { create } from 'apisauce'
import { getAuthQueryStringParams } from './utils'
import {
  MarvelApiResponse,
  MarvelHeroData,
  MarvelHeroesListResponse
} from './type'

type DataContextProps = {
  loading: boolean
  data: MarvelHeroData
}

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
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<MarvelHeroData>([])

  useEffect(() => {
    api.get('/v1/public/characters').then(res => {
      const apiResponse =
        res.data as MarvelApiResponse<MarvelHeroesListResponse>

      setData(apiResponse.data.results)
    })
  }, [])

  return (
    <DataContext.Provider value={{ data, loading }}>
      {children}
    </DataContext.Provider>
  )
}
