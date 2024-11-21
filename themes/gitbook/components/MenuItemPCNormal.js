import Link from 'next/link'
import { useRouter } from 'next/router'

export const MenuItemPCNormal = props => {
  const { link } = props
  const router = useRouter()
  const selected = router.pathname === link.to || router.asPath === link.to
  if (!link || !link.show) {
    return null
  }

  return (
    <Link
      key={`${link.id}-${link.to}`}
      title={link.to}
      href={link.to}
      className={
        'px-2 duration-300 text-sm justify-between dark:text-neutral-300 cursor-pointer flex flex-nowrap items-center ' +
        (selected
          ? 'bg-yellow-600 text-white hover:text-white'
          : 'hover:text-yellow-600')
      }
    >
      <div className="items-center justify-center flex ">
        <i className={link.icon} />
        <div className="ml-2 whitespace-nowrap">{link.name}</div>
      </div>
      {link.slot}
    </Link>
  )
}
