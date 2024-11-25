import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  //   const show = true
  //   const changeShow = () => {}
  const router = useRouter()

  if (!link || !link.show) {
    return null
  }
  const hasSubMenu = link?.subMenus?.length > 0
  const selected = router.pathname === link.to || router.asPath === link.to

  return (
    <li
      className="cursor-pointer list-none items-center flex mx-2 "
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}
    >
      {hasSubMenu && (
        <div
          className={
            'px-2 h-full whitespace-nowrap duration-300 text-sm justify-between dark:text-neutral-300 cursor-pointer flex flex-nowrap items-center ' +
            (selected
              ? ' text-black hover:text-white '
              : 'hover:text-[#ffd500]')
          }
        >
          <div>
            {link?.icon && <i className={link?.icon} />} {link?.name}
            {hasSubMenu && (
              <i
                className={`px-2 fas fa-chevron-down duration-500 transition-all ${
                  show ? ' rotate-180' : ''
                }`}
              ></i>
            )}
          </div>
        </div>
      )}

      {!hasSubMenu && (
        <div
          className={
            'px-2 h-full whitespace-nowrap duration-300 text-sm justify-between dark:text-neutral-300 cursor-pointer flex flex-nowrap items-center ' +
            (selected
              ? 'bg-[#ffd500] rounded-lg h-4/5 text-black dark:text-neutral-700 hover:text-white '
              : 'hover:text-[#ffd500] dark:hover:text-[#ffffff]')
          }
        >
          <Link
            href={link?.to}
            target={link?.to?.indexOf('http') === 0 ? '_blank' : '_self'}
          >
            {link?.icon && <i className={link?.icon} />} {link?.name}
          </Link>
        </div>
      )}

      {/* 하위 메뉴 */}
      {hasSubMenu && (
        <ul
          className={`${
            show ? 'visible opacity-100 top-12 ' : 'invisible opacity-0 top-10 '
          } border-neutral-100  bg-white  dark:bg-neutral-600 dark:border-neutral-800 transition-all duration-300 z-20 absolute block drop-shadow-lg rounded-lg dark:hover:text-[#ffffff]`}
        >
          {link?.subMenus?.map((sLink, index) => {
            return (
              <div key={index} className="h-full w-full">
                <li
                  className="not:last-child:border-b-0 border-b
                   text-neutral-700 dark:text-neutral-200
                    tracking-widest transition-all duration-200  dark:border-neutral-800 py-3 pr-6 pl-3"
                >
                  <Link
                    className="hover:bg-[#ffd500] dark:hover:text-[#ffffff] px-2 hover:rounded-lg hover:h-4/5 w-full"
                    href={sLink.to}
                    target={sLink?.to?.includes('http') ? '_blank' : '_self'}
                  >
                    <span className="text-xs font-extralight dark:hover:text-neutral-900">
                      {link?.icon && <i className={sLink?.icon}> &nbsp; </i>}
                      {sLink.title}
                    </span>
                  </Link>
                </li>
              </div>
            )
          })}
        </ul>
      )}
    </li>
  )
}
