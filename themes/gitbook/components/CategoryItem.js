import Link from 'next/link'

export default function CategoryItem({ selected, category, categoryCount }) {
  return (
    <Link
      href={`/category/${category}`}
      passHref
      className={
        (selected
          ? 'hover:text-white dark:hover:text-white bg-yellow-600 text-white '
          : 'dark:text-yellow-400 text-neutral-500 hover:text-white dark:hover:text-white hover:bg-yellow-600') +
        ' flex text-sm items-center duration-300 cursor-pointer py-1 font-light px-2 whitespace-nowrap'
      }
    >
      <div>
        <i
          className={`mr-2 fas ${selected ? 'fa-folder-open' : 'fa-folder'}`}
        />
        {category} {categoryCount && `(${categoryCount})`}
      </div>
    </Link>
  )
}
