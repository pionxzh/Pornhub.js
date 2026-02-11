import { Route } from '../../apis'
import { getAttribute, getCheerio, getDataAttribute } from '../../utils/cheerio'
import { parseReadableNumber } from '../../utils/number'
import { UrlParser } from '../../utils/url'
import { BASE_URL } from '../../utils/constant'
import type { Engine } from '../../core/engine'
import type { CheerioAPI } from 'cheerio'

export interface GifPage {
    id: string
    url: string
    title: string
    views: number
    vote: {
        up: number
        down: number
        total: number
        rating: number
    }
    premium: boolean
    thumb: string
    preview: string
    mp4: string
    webm: string
    provider: {
        username: string
        url: string
    } | null
    sourceVideo: {
        title: string
        url: string
        timestampSeconds: number
        timestampFormatted: string
    } | null
    tags: string[]
    pornstars: string[]
    categories: string[]
    uploadDate: Date
}

export async function gifPage(engine: Engine, urlOrId: string): Promise<GifPage> {
    const id = UrlParser.getGifID(urlOrId)
    const url = Route.gifPage(id)
    const res = await engine.request.get(url)
    const html = await res.text()
    const $ = getCheerio(html)

    // Log the entire HTML for debugging
    console.warn('\n=== GIF PAGE HTML DEBUG =====')
    console.warn(`GIF ID: ${id}`)
    console.warn(`URL: ${url}`)
    console.warn(`Status: ${res.status}`)
    console.warn('HTML Content:')
    console.warn(html)
    console.warn('============================\n')

    const result = {
        id,
        url,
        ...parseByDom(html, $),
    }

    // Log the parsed result
    console.warn('\n=== PARSED GIF DATA DEBUG ===')
    console.warn('Parsed Result:')
    console.warn(JSON.stringify(result, null, 2))
    console.warn('=============================\n')

    return result
}

export function parseByDom(html: string, $: CheerioAPI) {
    console.warn('\n--- Starting DOM parsing ---')

    const voteUp = parseReadableNumber($('span.votesUp').text() || '0')
    const voteDown = parseReadableNumber($('span.votesDown').text() || '0')
    console.warn(`Votes - Up: ${voteUp}, Down: ${voteDown}`)

    const title = $('head > title').first().text().replace(' - Pornhub.com', '')
    console.warn(`Title: ${title}`)

    const viewsText = $('span.count').text() || '0'
    const views = parseReadableNumber(viewsText)
    console.warn(`Views: ${views} (raw: ${viewsText})`)

    const totalVote = voteUp + voteDown
    const vote = {
        up: voteUp,
        down: voteDown,
        total: totalVote,
        rating: totalVote === 0 ? 0 : Math.round(voteUp / totalVote * 100) / 100,
    }

    const premium = $('#gifTitle .ph-icon-badge-premium').length !== 0
    const thumb = getAttribute<string>($('.thumbnail img'), 'src', '')
    const preview = getAttribute<string>($('head meta[property="og:image"]'), 'content', '')
    console.warn(`Premium: ${premium}, Thumb: ${thumb}, Preview: ${preview}`)

    // Get gif media URLs
    const gifVideo = $('video').first()
    const mp4 = getDataAttribute<string>(gifVideo, 'mp4', '') || getAttribute<string>(gifVideo, 'src', '')
    const webm = getDataAttribute<string>(gifVideo, 'webm', '')
    console.warn(`Media URLs - MP4: ${mp4}, WebM: ${webm}`)

    // Provider information
    const providerLink = $('.usernameBadgesWrapper a.bolded').first()
    const provider = providerLink.length
        ? { username: providerLink.text(), url: getAttribute<string>(providerLink, 'href', '') }
        : null
    console.warn(`Provider: ${provider ? JSON.stringify(provider) : 'null'}`)

    // Parse source video information
    const sourceVideo = parseSourceVideo($)
    console.warn(`Source Video: ${sourceVideo ? JSON.stringify(sourceVideo) : 'null'}`)

    const trafficJunkyMeta = $('head meta[name=adsbytrafficjunkycontext]')
    const tags = getDataAttribute<string>(trafficJunkyMeta, 'context-tag')?.split(',') || []
    const pornstars = getDataAttribute<string>(trafficJunkyMeta, 'context-pornstar')?.split(',') || []
    const categories = getDataAttribute<string>(trafficJunkyMeta, 'context-category')?.split(',') || []
    console.warn(`Tags: [${tags.join(', ')}]`)
    console.warn(`Pornstars: [${pornstars.join(', ')}]`)
    console.warn(`Categories: [${categories.join(', ')}]`)
    console.warn('--- DOM parsing complete ---\n')

    return {
        title,
        views,
        vote,
        premium,
        thumb,
        preview,
        mp4,
        webm,
        provider,
        sourceVideo,
        tags,
        pornstars,
        categories,
        ...parseByLdJson($),
    }
}

function parseSourceVideo($: CheerioAPI) {
    console.warn('--- Parsing source video ---')
    try {
        const sourceTagDiv = $('.sourceTagDiv')
        console.warn(`Found sourceTagDiv elements: ${sourceTagDiv.length}`)
        if (sourceTagDiv.length === 0) {
            console.warn('No sourceTagDiv found, returning null')
            return null
        }

        const videoLink = sourceTagDiv.find('a[href*="/view_video.php"]').first()
        console.warn(`Found video links: ${sourceTagDiv.find('a[href*="/view_video.php"]').length}`)
        if (videoLink.length === 0) {
            console.warn('No video link found, returning null')
            return null
        }

        const timestampLink = sourceTagDiv.find('.tstamp').first()
        console.warn(`Found timestamp links: ${sourceTagDiv.find('.tstamp').length}`)
        if (timestampLink.length === 0) {
            console.warn('No timestamp link found, returning null')
            return null
        }

        const title = videoLink.text().trim()
        const href = getAttribute<string>(videoLink, 'href', '')
        const url = href.startsWith('http') ? href : `${BASE_URL}${href}`
        const timestampFormatted = timestampLink.text().trim()
        const timestampSeconds = convertTimeToSeconds(timestampFormatted)

        const result = {
            title,
            url,
            timestampSeconds,
            timestampFormatted,
        }
        console.warn(`Source video parsed: ${JSON.stringify(result)}`)
        console.warn('--- Source video parsing complete ---')
        return result
    }
    catch (error) {
        console.warn(`Error parsing source video: ${error}`)
        console.warn('--- Source video parsing failed ---')
        return null
    }
}

function convertTimeToSeconds(timeString: string): number {
    try {
        const parts = timeString.split(':').map(part => Number.parseInt(part, 10))
        if (parts.length === 2) {
            // mm:ss format
            return parts[0] * 60 + parts[1]
        }
        else if (parts.length === 3) {
            // hh:mm:ss format
            return parts[0] * 3600 + parts[1] * 60 + parts[2]
        }
        return 0
    }
    catch {
        return 0
    }
}

function parseByLdJson($: CheerioAPI) {
    try {
        const ldPlusJson = JSON.parse($('head script[type="application/ld+json"]').first().text())
        const uploadDate = new Date(ldPlusJson.uploadDate)
        return {
            uploadDate,
        }
    }
    catch (error) {
        console.error('Failed to parse ld+json', error)
        return {
            uploadDate: new Date(0),
        }
    }
}
