import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { marvelProxy } from '../proxy'
import {
  ApiRequestContextState,
  CachedDataContextProps,
  ContextStateFetched,
  ContextStateFetching,
  ContextStateInitialized,
  ContextStateUninitialized,
  IActions,
  MarvelData,
  MarvelResponseData
} from '../type'
import { getFullUrl, getPaginationQueryStringParams } from '../utils'

const initialState = {
  isFetching: false
}

const ApiRequestContext = createContext<
  [ApiRequestContextState<MarvelData>, IActions]
>([initialState as ContextStateUninitialized, { paginate: () => undefined }])

export const useCachedRequests = (): [
  ApiRequestContextState<MarvelData>,
  IActions
] => {
  return useContext(ApiRequestContext)
}

export function CachedRequestsProvider({
  children,
  url,
  maxResultsPerPage
}: CachedDataContextProps) {
  const [state, setState] = useState<ApiRequestContextState<MarvelData>>({
    isFetching: false,
    url
  } as ContextStateInitialized)
  const [page, setPage] = useState(0)

  const getNavigatableUrl = useCallback(
    (): string => getFullUrl(url, { maxResultsPerPage, page }),
    [page, maxResultsPerPage, url]
  )

  const paginate = () => {
    if (!state.data?.[url]) return

    const totalResults: number = state.data[url].total
    const canFetchMore = page + 1 * maxResultsPerPage < totalResults

    canFetchMore && setPage(page + 1)
  }

  const setIsFetching = () => {
    if (state.url !== url) {
      setState({ isFetching: true, url })
      return
    }

    setState({ ...state, isFetching: true })
  }

  const updateExistingData = (value: MarvelResponseData) => {
    setState({
      ...state,
      isFetching: false,
      data: {
        ...state.data,
        [url]: {
          ...state.data[url],
          results: [...state.data[url].results, ...value.results]
        }
      }
    } as ContextStateFetched<MarvelData>)
  }

  const addNewData = (value: MarvelResponseData) => {
    setState({
      ...state,
      isFetching: false,
      data: {
        ...(state.data ?? {}),
        [url]: value
      }
    } as ContextStateFetched<MarvelData>)
  }

  const getProxyData = useCallback(() => {
    marvelProxy[getNavigatableUrl()]
      .then(value => {
        if (state.data && state.data[url]) {
          updateExistingData(value)
          return
        }

        addNewData(value)
      })
      .catch(console.error)
  }, [addNewData, getNavigatableUrl, url, state, updateExistingData])

  useEffect(() => {
    if (state.isFetching || !state.url) {
      return
    }

    setIsFetching()

    getProxyData()
  }, [page, url])

  return (
    <ApiRequestContext.Provider
      value={[
        state,
        {
          paginate
        }
      ]}>
      {children}
    </ApiRequestContext.Provider>
  )
}
