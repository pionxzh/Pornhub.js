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
    uploadDate: Date
}

export async function gifPage(engine: Engine, urlOrId: string): Promise<GifPage> {
    const id = UrlParser.getGifID(urlOrId)
    const url = Route.gifPage(id)
    const res = await engine.request.get(url)
    const html = await res.text()
    const $ = getCheerio(html)

    const result = {
        id,
        url,
        ...parseByDom(html, $),
    }

    return result
}

export function parseByDom(html: string, $: CheerioAPI) {
    const voteUp = parseReadableNumber($('#votesUp').val() as string || '0')
    const voteDown = parseReadableNumber($('#votesDown').val() as string || '0')

    const title = $('.gifTitle h1').first().text().replace(/ Gif$/, '')

    const viewsText = $('.gifViews strong').text().replace(' views', '') || '0'
    const views = parseReadableNumber(viewsText)

    const totalVote = voteUp + voteDown
    const vote = {
        up: voteUp,
        down: voteDown,
        total: totalVote,
        rating: totalVote === 0 ? 0 : Math.round(voteUp / totalVote * 100) / 100,
    }

    const premium = $('#gifTitle .ph-icon-badge-premium').length !== 0
    const preview = getAttribute<string>($('head meta[property="og:image"]'), 'content', '')

    const gifVideo = $('video').first()
    let mp4 = getDataAttribute<string>(gifVideo, 'mp4', '') || getAttribute<string>(gifVideo, 'src', '')
    const webm = getDataAttribute<string>(gifVideo, 'webm', '')

    if (!mp4) {
        const gifLinkInput = $('input.gifvalue, input[id="giflink"]')
        if (gifLinkInput.length > 0) {
            mp4 = gifLinkInput.val() as string || ''
        }

        if (!mp4) {
            const bbCodeText = $('input[id="forumbbcode"]').val() as string || ''
            const gifUrlMatch = bbCodeText.match(/\[IMG\](https?:\/\/[^\]]+\.gif[^\]]*)/i)
            if (gifUrlMatch) {
                mp4 = gifUrlMatch[1]
            }
        }
    }

    const providerLink = $('.sourceTagDiv .usernameBadgesWrapper a').first()
    const provider = providerLink.length
        ? { username: providerLink.text(), url: getAttribute<string>(providerLink, 'href', '') }
        : null

    const sourceVideo = parseSourceVideo($)

    const trafficJunkyMeta = $('head meta[name=adsbytrafficjunkycontext]')
    const tags = getDataAttribute<string>(trafficJunkyMeta, 'context-tag')?.split(',') || []
    const pornstars = getDataAttribute<string>(trafficJunkyMeta, 'context-pornstar')?.split(',') || []

    return {
        title,
        views,
        vote,
        premium,
        preview,
        mp4,
        webm,
        provider,
        sourceVideo,
        tags,
        pornstars,
        ...parseByLdJson($),
    }
}

function parseSourceVideo($: CheerioAPI) {
    try {
        const sourceTagDiv = $('.sourceTagDiv')
        if (sourceTagDiv.length === 0) {
            return null
        }

        const videoLink = sourceTagDiv.find('a[href*="/view_video.php"]').first()
        if (videoLink.length === 0) {
            return null
        }

        const timestampLink = sourceTagDiv.find('.tstamp').first()
        if (timestampLink.length === 0) {
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
        return result
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
        return {
            uploadDate: new Date(0),
        }
    }
}
