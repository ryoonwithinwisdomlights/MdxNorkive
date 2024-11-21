import fs from 'fs'
import { Feed } from 'feed'
import { BLOG } from '@/blog.config'
import ReactDOMServer from 'react-dom/server'
import { getPostBlocks } from './notion'
import NotionPage from '@/components/NotionPage'

/**
 * Generate RSS content
 * @param {*} post
 * @returns
 */
const createFeedContent = async post => {
  // Encrypted article content returns only abstract
  if (post.password && post.password !== '') {
    return post.summary
  }
  const blockMap = await getPostBlocks(post.id, 'rss-content')
  if (blockMap) {
    post.blockMap = blockMap
    const content = ReactDOMServer.renderToString(<NotionPage post={post} />)
    const regexExp =
      /<div class="notion-collection-row"><div class="notion-collection-row-body"><div class="notion-collection-row-property"><div class="notion-collection-column-title"><svg.*?class="notion-collection-column-title-icon">.*?<\/svg><div class="notion-collection-column-title-body">.*?<\/div><\/div><div class="notion-collection-row-value">.*?<\/div><\/div><\/div><\/div>/g
    return content.replace(regexExp, '')
  }
}

export async function generateRss(posts) {
  const year = new Date().getFullYear()
  const feed = new Feed({
    title: BLOG.TITLE,
    description: BLOG.DESCRIPTION,
    link: `${BLOG.LINK}/${BLOG.SUB_PATH}`,
    language: BLOG.LANG,
    favicon: `${BLOG.LINK}/favicon.png`,
    copyright: `All rights reserved ${year}, ${BLOG.AUTHOR}`,
    author: {
      name: BLOG.AUTHOR,
      email: BLOG.CONTACT_EMAIL,
      link: BLOG.LINK
    }
  })
  for (const post of posts) {
    feed.addItem({
      title: post.title,
      link: `${BLOG.LINK}/${post.slug}`,
      description: post.summary,
      content: await createFeedContent(post),
      date: new Date(post?.publishDay)
    })
  }

  try {
    fs.mkdirSync('./public/rss', { recursive: true })
    fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
    fs.writeFileSync('./public/rss/atom.xml', feed.atom1())
    fs.writeFileSync('./public/rss/feed.json', feed.json1())
  } catch (error) {
    // The running environment in vercel is read-only, and an error will be reported here;
    // However, this line of code will be executed successfully during the vercel compilation phase or on other platforms such as VPS
    // RSS accessed by high-frequency words will consume a lot of server resources, so it is used as a static file.
  }
}
