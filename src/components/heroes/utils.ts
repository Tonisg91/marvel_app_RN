import { AuthParams } from './type'
import { TS, APIKEY, HASH } from '@env'

export function getAuthQueryStringParams(): AuthParams {
  return {
    hash: HASH,
    ts: TS,
    apikey: APIKEY
  }
}

function getPaginationQueryStringParams(
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
