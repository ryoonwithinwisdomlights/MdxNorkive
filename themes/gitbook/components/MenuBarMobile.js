import React from 'react'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { BLOG } from '@/blog.config'
import { MenuItemCollapse } from './MenuItemCollapse'

export const MenuBarMobile = props => {
  const { customMenu, customNav } = props
  const { locale } = useGlobal()

  let links = [
    // { name: locale.NAV.INDEX, to: '/' || '/', show: true },
    {
      name: locale.COMMON.CATEGORY,
      to: '/category',
      show: CONFIG.MENU_CATEGORY
    },
    { name: locale.COMMON.TAGS, to: '/tag', show: CONFIG.MENU_TAG },
    { name: locale.NAV.ARCHIVE, to: '/archive', show: CONFIG.MENU_ARCHIVE },
    {
      name: locale.NAV.WRITING,
      to: '/writing',
      show: CONFIG.MENU_WRITING
    },
    {
      name: locale.NAV.SIDEPROJECT,
      to: '/sideproject',
      show: CONFIG.MENU_SIDEPROJECT
    },
    {
      name: locale.NAV.AGIVEAWAYLOG,
      to: '/agiveawaylog',
      show: CONFIG.MENU_AGIVEAWAYLOG
    },
    {
      name: locale.NAV.INSPIRATION,
      to: '/inspiration',
      show: CONFIG.MENU_INSPIRATION
    }
    // { name: locale.NAV.SEARCH, to: '/search', show: CONFIG.MENU_SEARCH }
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  // If the custom menu is enabled, Page will no longer be used to generate the menu.
  if (BLOG.CUSTOM_MENU) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  return (
    <nav id="nav" className=" text-md">
      {/* {links.map(link => <NormalMenu key={link?.id} link={link}/>)} */}
      {links?.map((link, index) => (
        <MenuItemCollapse
          onHeightChange={props.onHeightChange}
          key={index}
          link={link}
        />
      ))}
    </nav>
  )
}
