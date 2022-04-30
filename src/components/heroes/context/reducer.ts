import { InitStateContext } from '../type'

export const initialState: InitStateContext = {
  heroes: {
    offset: 0,
    limit: 30,
    data: []
  },
  comics: {
    offset: 0,
    limit: 30,
    data: []
  },
  fetching: true
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
      return { ...state, fetching: true }
    case INITIAL_LOAD:
      return {
        ...state,
        fetching: false,
        heroes: {
          ...state.heroes,
          data: action.payload
        }
      }
    case LOAD_MORE_HEROES:
      return {
        ...state,
        fetching: false,
        heroes: {
          ...state.heroes,
          offset: state.heroes.offset + 30,
          data: [...state.heroes.data, ...action.payload]
        }
      }
    case LOAD_COMICS:
      return {
        ...state,
        fetching: false,
        comics: {
          ...state.comics,
          data: [...state.comics.data, ...action.payload]
        }
      }
    case LOAD_MORE_COMICS:
      return {
        ...state,
        fetching: false,
        comics: {
          ...state.comics,
          offset: state.comics.offset + 30,
          data: [...state.comics.data, ...action.payload]
        }
      }
    default:
      return state
  }
}
