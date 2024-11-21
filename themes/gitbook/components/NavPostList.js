import NavPostListEmpty from './NavPostListEmpty'
import { useRouter } from 'next/router'
import NavPostItem from './NavPostItem'
import CONFIG from '../config'

/**
 * Blog list scrolling paging
 * @param posts All articles
 * @param tags All tags
 * @returns {JSX.Element}
 * @constructor
 */
const NavPostList = props => {
  const { filteredNavPages } = props
  const router = useRouter()
  let selectedSth = false
  const groupedArray = filteredNavPages?.reduce((groups, item) => {
    const categoryName = item?.category ? item?.category : '' // Convert category to string

    let existingGroup = null
    // Turn on automatic group sorting
    if (JSON.parse(CONFIG.AUTO_SORT)) {
      existingGroup = groups.find(group => group.category === categoryName) // Search for the last group with the same name
    } else {
      existingGroup = groups[groups.length - 1] // Get the last group
    }

    // adding data
    if (existingGroup && existingGroup.category === categoryName) {
      existingGroup.items.push(item)
    } else {
      groups.push({ category: categoryName, items: [item] })
    }
    return groups
  }, [])

  // Handle whether selected
  groupedArray?.map(group => {
    let groupSelected = false
    for (const post of group?.items) {
      if (router.asPath.split('?')[0] === '/' + post.slug) {
        groupSelected = true
        selectedSth = true
      }
    }
    group.selected = groupSelected
    return null
  })

  // If none are selected, the first one will be opened by default.
  if (!selectedSth && groupedArray && groupedArray?.length > 0) {
    groupedArray[0].selected = true
  }

  if (!groupedArray || groupedArray.length === 0) {
    return <NavPostListEmpty />
  } else {
    return (
      <div id="posts-wrapper" className="w-full flex-grow ">
        {/* Article list */}
        {groupedArray?.map((group, index) => (
          <NavPostItem
            key={index}
            group={group}
            onHeightChange={props.onHeightChange}
          />
        ))}
      </div>
    )
  }
}

export default NavPostList
