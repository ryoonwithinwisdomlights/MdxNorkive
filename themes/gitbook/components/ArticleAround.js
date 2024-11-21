import Link from 'next/link'

/**
 * Previous article, next article
 * @param {prev,next} param0
 * @returns
 */
export default function ArticleAround({ prev, next }) {
  if (!prev || !next) {
    return <></>
  }
  return (
    <section className="text-neutral-800 dark:text-neutral-400 h-12 flex items-center justify-between space-x-5 my-4">
      <Link
        href={`/${prev.slug}`}
        passHref
        className="text-sm cursor-pointer justify-start items-center flex hover:underline duration-300"
      >
        <i className="mr-1 fas fa-angle-double-left" />
        {prev.title}
      </Link>
      <Link
        href={`/${next.slug}`}
        passHref
        className="text-sm cursor-pointer justify-end items-center flex hover:underline duration-300"
      >
        {next.title}
        <i className="ml-1 my-1 fas fa-angle-double-right" />
      </Link>
    </section>
  )
}
