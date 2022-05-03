import { ApisauceInstance } from 'apisauce'

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

export type CachedDataContextProps = {
  url: string
  maxResultsPerPage: number
  heroId?: number
  children: JSX.Element
}

export type MarvelApiResponse<T> = {
  attributionHTML: string
  attributionText: string
  code: number
  copyright: string
  data: MarvelResponseData<T>
  etag: string
  status: string
}

export type MarvelResponseData = {
  offset: number
  limit: number
  total: number
  count: number
  results: MarvelData
}

export type MarvelResponse =
  | MarvelApiResponse<MarvelHeroData>
  | MarvelApiResponse<MarvelComicData>

export type MarvelHeroData = Array<Character>
export type MarvelComicData = Array<Comic>
export type MarvelData = MarvelHeroData | MarvelComicData

export interface AuthParams {
  apikey: string
  ts: string
  hash: string
}

export interface Character {
  id: number
  name: string
  description: string
  modified: Date
  resourceURI: string
  urls: URL[]
  thumbnail: Image
  comics: Resource
  stories: Resource
  events: Resource
  series: Resource
}

export interface Comic {
  id: number
  digitalId: number
  title: string
  issueNumber: number
  variantDescription: string
  description: string
  modified: Date
  isbn: string
  upc: string
  diamondCode: string
  ean: string
  issn: string
  format: string
  pageCount: number
  textObjects: TextObject[]
  resourceURI: string
  urls: URL[]
  series: any // TODO: check
  variants: any[] // check
  collections: any[]
  collectedIssues: any[]
  dates: any[]
  prices: any[]
  thumbnail: Image
  images: Image[]
  creators: Resource
  characters: Resource
  stories: Resource
  events: Resource
}

export interface TextObject {
  type: string
  language: string
  text: string
}
export interface Image {
  path: string
  extension: string
}

export interface URL {
  type: string
  url: string
}

export interface Resource {
  available: number
  returned: number
  collectionURI: string
  items: any[] // Check
}
