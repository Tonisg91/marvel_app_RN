export type DataContextProps = {
  data: InitStateContext
  loadMoreHeroes: () => void
  loadComics: (characterId: string) => void
}

interface MarvelDataContext<T> {
  offset: number
  limit: number
  data: T
}

export type InitStateContext = {
  heroes: MarvelDataContext<MarvelHeroData>
  comics: MarvelDataContext<MarvelComicData>
  fetching: boolean
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

export type MarvelResponseData<T> = {
  offset: number
  limit: number
  total: number
  count: number
  results: T
}

export type MarvelResponse =
  | MarvelResponse<MarvelHeroData>
  | MarvelResponse<MarvelComicData>

export type MarvelHeroData = Array<Character>
export type MarvelComicData = Array<Comic>
export type MarvelData = MarvelHeroData | MarvelComicData

export interface AuthParams {
  apikey: string
  ts: string
  hash: string
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
  creators: Resource[]
  characters: Resource[]
  stories: Resource[]
  events: Resource[]
}
