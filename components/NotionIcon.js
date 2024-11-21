import LazyImage from './LazyImage'

/**
 * notion icon icon
 * It may be emoji, it may be svg, it may be a picture
 * @returns
 */
const NotionIcon = ({ icon }) => {
  if (!icon) {
    return <></>
  }

  if (icon.startsWith('http') || icon.startsWith('data:')) {
    return <LazyImage src={icon} className="w-8 h-8 my-auto inline mr-1" />
  }

  return <span className="mr-1">{icon}</span>
}

export default NotionIcon
