import { ApisauceInstance } from 'apisauce'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { marvelProxy } from '../api'
import { MarvelData } from '../type'
import { getPaginationQueryStringParams } from '../utils'

type Props = {
  url: string
  maxResultsPerPage: number
  children: JSX.Element
}

type ContextStateUninitialized = {
  url?: undefined
  isFetching: false
  data?: undefined
}

type ContextStateInitialized = {
  url: string
  isFetching: false
  data?: undefined
}

type ContextStateFetching<T> = {
  url: string
  isFetching: true
  data?: T
}

type ContextStateFetched<T> = {
  url: string
  isFetching: false
  data: T
  apisauceInstance: ApisauceInstance
}

type ApiRequestContextState<T> =
  | ContextStateUninitialized
  | ContextStateInitialized
  | ContextStateFetching<T>
  | ContextStateFetched<T>

interface IActions {
  paginate(): void
}

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
}: Props) {
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
      // ...authParams,
      ...queryString
    }).forEach(([key, value]) => {
      newUrl.searchParams.append(key, value)
    })

    const definitveUrl = newUrl.toString()
    return definitveUrl
  }, [page, maxResultsPerPage, url])

  const paginate = () => setPage(page + 1)

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
        if (state.data && state.data[url]) {
          setState({
            ...state,
            isFetching: false,
            data: {
              ...state.data,
              [url]: [...state.data[url], ...value]
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

  console.log(state)

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
