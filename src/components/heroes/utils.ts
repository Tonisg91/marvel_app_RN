import { AuthParams } from './type'
import { TS, APIKEY, HASH } from '@env'

export function getAuthQueryStringParams(): AuthParams {
  return {
    hash: HASH,
    ts: TS,
    apikey: APIKEY
  }
}

export function getPaginationQueryStringParams(
  maxResults: number,
  page: number
): {
  limit: string
  offset: string
} {
  return {
    limit: `${maxResults}`,
    offset: `${maxResults * page}`
  }
}

export function getFullUrl(
  url: string,
  queryParams: { maxResultsPerPage: number; page: number }
): string {
  // new URL is broken in RN. Adds trailing slash.
  // https://github.com/facebook/react-native/issues/24428
  // Added polyfill https://github.com/charpeni/react-native-url-polyfill
  const newUrl = new URL(url)

  const { maxResultsPerPage, page } = queryParams

  const queryString = getPaginationQueryStringParams(maxResultsPerPage, page)

  Object.entries({
    ...queryString
  }).forEach(([key, value]) => {
    newUrl.searchParams.append(key, value)
  })

  const definitveUrl = newUrl.toString()
  return definitveUrl
}
