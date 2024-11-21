import { isIterable } from '../utils'

/**
 * Get tags of all articles
 * @param allPosts
 * @param sliceCount The default number of interceptions is 12, if it is 0, all will be returned
 * @param tagOptions drop-down options for tags
 * @returns {Promise<{}|*[]>}
 */
export function getAllTags({ allPages, sliceCount = 0, tagOptions }) {
  const allPosts = allPages?.filter(
    page =>
      page.type !== 'CONFIG' &&
      page.type !== 'Menu' &&
      page.type !== 'SubMenu' &&
      page.type !== 'Notice' &&
      page.type !== 'Page' &&
      page.status === 'Published'
  )

  if (!allPosts || !tagOptions) {
    return []
  }
  // count
  let tags = allPosts?.map(p => p.tags)
  tags = [...tags.flat()]
  const tagObj = {}
  tags.forEach(tag => {
    if (tag in tagObj) {
      tagObj[tag]++
    } else {
      tagObj[tag] = 1
    }
  })
  const list = []
  if (isIterable(tagOptions)) {
    tagOptions.forEach(c => {
      const count = tagObj[c.value]
      if (count) {
        list.push({ id: c.id, name: c.value, color: c.color, count })
      }
    })
  }

  // Sort by quantity

  // list.sort((a, b) => b.count - a.count)
  if (sliceCount && sliceCount > 0) {
    return list.slice(0, sliceCount)
  } else {
    return list
  }
}
