/**
 * Substack integration: config and RSS feed helper.
 * Fetches at build time; content stays hosted on Substack.
 */

export const SUBSTACK_PUBLICATION = 'partnersinthought.substack.com'
export const SUBSTACK_FEED_URL = `https://${SUBSTACK_PUBLICATION}/feed`
export const SUBSTACK_HOME_URL = `https://${SUBSTACK_PUBLICATION}`

export interface SubstackPost {
  title: string
  link: string
  pubDate: string
  contentSnippet: string
}

/**
 * Fetches and parses the Substack RSS feed. Returns an array of posts.
 * On fetch/parse error, returns [] so the build does not fail.
 */
export async function getSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const Parser = (await import('rss-parser')).default
    const parser = new Parser()
    const feed = await parser.parseURL(SUBSTACK_FEED_URL)

    if (!feed.items?.length) {
      return []
    }

    return feed.items.map((item) => ({
      title: item.title ?? 'Untitled',
      link: item.link ?? SUBSTACK_HOME_URL,
      pubDate: item.pubDate ?? '',
      contentSnippet: item.contentSnippet?.trim() ?? '',
    }))
  } catch (_err) {
    return []
  }
}

/**
 * Format a pubDate string for display (e.g. "Jan 15, 2025").
 */
export function formatPubDate(isoOrRfcDate: string): string {
  if (!isoOrRfcDate) return ''
  const date = new Date(isoOrRfcDate)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
