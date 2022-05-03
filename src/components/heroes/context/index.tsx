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
  ContextStateInitialized,
  ContextStateUninitialized,
  IActions,
  MarvelData
} from '../type'
import { getPaginationQueryStringParams } from '../utils'

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
  maxResultsPerPage,
  heroId
}: CachedDataContextProps) {
  const [state, setState] = useState<ApiRequestContextState<MarvelData>>({
    isFetching: false,
    url
  } as ContextStateInitialized)
  const [page, setPage] = useState(0)

  const getNavigatableUrl = useCallback((): string => {
    // new URL is broken in RN. Adds trailing slash.
    // https://github.com/facebook/react-native/issues/24428
    // Added polyfill https://github.com/charpeni/react-native-url-polyfill
    const newUrl = new URL(url)

    const queryString = getPaginationQueryStringParams(maxResultsPerPage, page)

    Object.entries({
      ...queryString
    }).forEach(([key, value]) => {
      newUrl.searchParams.append(key, value)
    })

    const definitveUrl = newUrl.toString()
    return definitveUrl
  }, [page, maxResultsPerPage, url])

  const paginate = () => {
    if (!state.data?.[url]) return

    const totalResults: number = state.data[url].total
    const canFetchMore = page + 1 * maxResultsPerPage < totalResults

    canFetchMore && setPage(page + 1)
  }

  useEffect(() => {
    if (state.isFetching || !state.url) {
      return
    }

    setState(
      state.url !== url
        ? {
            isFetching: true,
            url
          }
        : {
            ...state,
            isFetching: true
          }
    )

    marvelProxy[getNavigatableUrl()]
      .then(value => {
        // catch if url includes comics

        if (state.data && state.data[url]) {
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
          })
          return
        }

        setState({
          ...state,
          isFetching: false,
          data: {
            ...(state.data ?? {}),
            [url]: value
          }
        } as ContextStateFetched<MarvelData>)
      })
      .catch(console.error)
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
