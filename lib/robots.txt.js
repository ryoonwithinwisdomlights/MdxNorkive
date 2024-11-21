import fs from 'fs'
import { BLOG } from '@/blog.config'

export async function generateRobotsTxt() {
  const content = `
    # *
    User-agent: *
    Allow: /
  
    # Host
    Host: ${BLOG.LINK}
  
    # Sitemaps
    Sitemap: ${BLOG.LINK}/sitemap.xml
  
    `
  try {
    fs.mkdirSync('./public', { recursive: true })
    fs.writeFileSync('./public/robots.txt', content)
  } catch (error) {
    // The running environment in vercel is read-only, and an error will be reported here;
    // However, this line of code will be executed successfully during the vercel compilation phase or on other platforms such as VPS.
  }
}
