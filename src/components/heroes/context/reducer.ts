import { InitStateContext } from '../type'

const marvelResponse = {
  offset: 0,
  limit: 20,
  total: 0,
  count: 0,
  results: []
}

export const initialState: InitStateContext = {
  heroes: marvelResponse,
  comics: [],
  loading: true
}

export const FETCH_MORE = 'FETCH_MORE'

export const INITIAL_LOAD = 'INITIAL_LOAD'
export const LOAD_MORE_HEROES = 'LOAD_MORE_HEROES'

export const LOAD_MORE_COMICS = 'LOAD_MORE_COMICS'
export const LOAD_COMICS = 'LOAD_COMICS'

export function reducer(
  state: InitStateContext,
  action: { type: string; payload: any }
): InitStateContext {
  switch (action.type) {
    case FETCH_MORE:
      return { ...state, loading: true }
    case INITIAL_LOAD:
      return {
        ...state,
        loading: false,
        heroes: action.payload
      }
    case LOAD_MORE_HEROES:
      return {
        ...state,
        loading: false,
        heroes: {
          ...state.heroes,
          offset: state.heroes.offset + 30,
          results: [...state.heroes.results, ...action.payload]
        }
      }
    case LOAD_COMICS:
      return {
        ...state,
        loading: false,
        comics: [
          ...state.comics,
          { id: action.payload.id, data: action.payload.data }
        ]
      }
    case LOAD_MORE_COMICS: {
      return {
        ...state,
        comics: state.comics.map(elem => {
          if (elem.id === action.payload.id) {
            return {
              ...elem,
              data: {
                ...elem.data,
                offset: elem.data.offset + elem.data.results.length,
                results: [...elem.data.results, ...action.payload.data.results]
              }
            }
          }
          return elem
        })
      }
    }
    default:
      return state
  }
}
