import { useEffect, useMemo, useState } from 'react'
import { useData } from '../context'

export default function useComics(characterId: number) {
  const { data, loadComics, loadMoreComics } = useData()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (data.comics.length === 0) {
      setLoading(true)
      loadComics(characterId)
    }

    const hasElement = data.comics.find(elem => elem.id === characterId)
    if (!hasElement) {
      loadComics(characterId)
    }

    setLoading(false)
  }, [])

  const requiredData = data.comics.find(elem => elem.id === characterId)
  // console.log(requiredData?.data.results.length)

  const loadMore = () => {
    if (!requiredData) return

    const currentElements = requiredData.data.results.length

    const canFetchMore = currentElements < requiredData.data.total

    if (canFetchMore) {
      loadMoreComics(characterId, currentElements)
    }
  }

  return { loading, comics: requiredData?.data.results, loadMore }
}
