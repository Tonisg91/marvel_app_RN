import { AuthParams } from './type'
import { TS, APIKEY, HASH } from '@env'

export function getAuthQueryStringParams(): AuthParams {
  return {
    hash: HASH,
    ts: TS,
    apikey: APIKEY
  }
}
