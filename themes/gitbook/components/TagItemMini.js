import Link from 'next/link'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <Link
      key={tag}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className={`cursor-pointer inline-block rounded hover:bg-neutral-500 hover:text-white duration-200
        mr-2 py-1 px-2 text-xs whitespace-nowrap dark:hover:text-white
         ${
           selected
             ? 'text-white  bg-black  '
             : `text-neutral-600 hover:shadow-xl notion-${tag.color}_background `
         }`}
    >
      <div className="font-light ">
        {selected && <i className="mr-1 fas fa-tag" />}{' '}
        {tag.name + (tag.count ? `(${tag.count})` : '')}{' '}
      </div>
    </Link>
  )
}

export default TagItemMini
