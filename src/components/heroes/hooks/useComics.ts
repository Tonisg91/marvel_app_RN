import { useEffect } from 'react'
import { useData } from '../context'

export default function useComics(characterId: number) {
  const { data, loadComics, loadMoreComics } = useData()

  useEffect(() => {
    if (data.comics.length === 0) {
      loadComics(characterId)
    }

    const hasElement = data.comics.find(elem => elem.id === characterId)
    if (!hasElement) {
      loadComics(characterId)
    }
  }, [characterId, data.comics, loadComics])

  const requiredData = data.comics.find(elem => elem.id === characterId)

  const loadMore = () => {
    if (!requiredData) return

    const currentElements = requiredData.data.results.length

    const canFetchMore = currentElements < requiredData.data.total

    if (canFetchMore) {
      loadMoreComics(characterId, currentElements)
    }
  }

  return { comics: requiredData?.data.results, loadMore }
}
