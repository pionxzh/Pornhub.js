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

    return {
        id,
        url,
        ...parseByDom(html, $),
    }
}

export function parseByDom(html: string, $: CheerioAPI) {
    const voteUp = parseReadableNumber($('span.votesUp').text() || '0')
    const voteDown = parseReadableNumber($('span.votesDown').text() || '0')

    const title = $('head > title').first().text().replace(' - Pornhub.com', '')
    const viewsText = $('span.count').text() || '0'
    const views = parseReadableNumber(viewsText)
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

    // Get gif media URLs
    const gifVideo = $('video').first()
    const mp4 = getDataAttribute<string>(gifVideo, 'mp4', '') || getAttribute<string>(gifVideo, 'src', '')
    const webm = getDataAttribute<string>(gifVideo, 'webm', '')

    // Provider information
    const providerLink = $('.usernameBadgesWrapper a.bolded').first()
    const provider = providerLink.length
        ? { username: providerLink.text(), url: getAttribute<string>(providerLink, 'href', '') }
        : null

    // Parse source video information
    const sourceVideo = parseSourceVideo($)

    const trafficJunkyMeta = $('head meta[name=adsbytrafficjunkycontext]')
    const tags = getDataAttribute<string>(trafficJunkyMeta, 'context-tag')?.split(',') || []
    const pornstars = getDataAttribute<string>(trafficJunkyMeta, 'context-pornstar')?.split(',') || []
    const categories = getDataAttribute<string>(trafficJunkyMeta, 'context-category')?.split(',') || []

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
    try {
        const sourceTagDiv = $('.sourceTagDiv')
        if (sourceTagDiv.length === 0) return null

        const videoLink = sourceTagDiv.find('a[href*="/view_video.php"]').first()
        if (videoLink.length === 0) return null

        const timestampLink = sourceTagDiv.find('.tstamp').first()
        if (timestampLink.length === 0) return null

        const title = videoLink.text().trim()
        const href = getAttribute<string>(videoLink, 'href', '')
        const url = href.startsWith('http') ? href : `${BASE_URL}${href}`
        const timestampFormatted = timestampLink.text().trim()
        const timestampSeconds = convertTimeToSeconds(timestampFormatted)

        return {
            title,
            url,
            timestampSeconds,
            timestampFormatted,
        }
    }
    catch (error) {
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
    catch (error) {
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
