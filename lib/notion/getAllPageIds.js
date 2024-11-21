export default function getAllPageIds(
  collectionQuery,
  collectionId,
  collectionView,
  viewIds
) {
  if (!collectionQuery && !collectionView) {
    return []
  }
  // Sort by first view first
  let pageIds = []
  try {
    if (viewIds && viewIds.length > 0) {
      const ids =
        collectionQuery[collectionId][viewIds[0]]?.collection_group_results
          ?.blockIds
      for (const id of ids) {
        pageIds.push(id)
      }
    }
  } catch (error) {}

  // Otherwise, according to the original sorting of the database
  if (
    pageIds.length === 0 &&
    collectionQuery &&
    Object.values(collectionQuery).length > 0
  ) {
    const pageSet = new Set()
    Object.values(collectionQuery[collectionId]).forEach(view => {
      view?.blockIds?.forEach(id => pageSet.add(id)) // group view
      view?.collection_group_results?.blockIds?.forEach(id => pageSet.add(id)) // table view
    })
    pageIds = [...pageSet]
    // console.log('PageIds: Get from collectionQuery', collectionQuery, pageIds.length)
  }
  return pageIds
}
