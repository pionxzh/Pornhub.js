import { Route } from '../../apis'
import { getAttribute, getCheerio } from '../../utils/cheerio'
import { UrlParser } from '../../utils/url'
import { parseReadableNumber } from '../../utils/number'
import { parseVideoResult } from '../search/video'
import { parsePornstarResult } from '../list/pornstars'
import type { PornstarListResult } from '../list/pornstars'
import type { VideoListResult } from '../search/video'
import type { CheerioAPI } from 'cheerio'
import type { Engine } from '../../core/engine'

export interface ChannelPornstar {
    name: string
    url: string
    videos: number
    views: number
}

export interface ChannelPage {
    name: string
    url: string
    avatar: string
    cover: string

    rank: number
    subscribers: number
    videoCount: number
    videoViews: number

    about: string | null

    videos: VideoListResult[]
    pornstars: PornstarListResult[]
}

export async function channelPage(engine: Engine, urlOrName: string): Promise<ChannelPage> {
    const name = UrlParser.getChannelName(urlOrName)
    if (!name) throw new Error(`Invalid channel input: ${urlOrName}`)

    const url = Route.channelPage(name)
    const res = await engine.request.get(url)
    const html = await res.text()
    const $ = getCheerio(html)

    return parseByDom($, url)
}

const numberMapper = (value: string) => parseReadableNumber(value)

type statsKeys = 'rank' | 'videoCount' | 'videoViews' | 'subscribers'
const statsMapper: Record<string, {
    key: (key: string) => statsKeys
    value: (value: string) => string | boolean | number
}> = {
    'RANK': {
        key: () => 'rank',
        value: numberMapper,
    },
    'VIDEOS': {
        key: () => 'videoCount',
        value: numberMapper,
    },
    'VIDEO VIEWS': {
        key: () => 'videoViews',
        value: numberMapper,
    },
    'SUBSCRIBERS': {
        key: () => 'subscribers',
        value: numberMapper,
    },
}

function parseByDom($: CheerioAPI, url: string): ChannelPage {
    const name = $('.bottomExtendedWrapper .title').text().trim()

    const descriptionEl = $('#channelsBody .cdescriptions')
    const aboutCandidate = descriptionEl.children().eq(0).contents().eq(0)
    const about = aboutCandidate.get(0)?.type === 'text' ? aboutCandidate.text() : null

    const avatarEl = $('img#getAvatar')
    const avatar = getAttribute<string>(avatarEl, 'src', '')

    const coverEl = $('img#coverPictureDefault')
    const cover = getAttribute<string>(coverEl, 'src', '')

    const statInfos = $('#stats .info').toArray()
    const stats = Object.fromEntries(statInfos.map((el) => {
        const $info = $(el)
        const key = $info.find('span').text().trim()
        const value = $info.contents().eq(0).text().trim()
        const mapper = statsMapper[key]
        return [mapper.key(key), mapper.value(value)]
    })) as Record<statsKeys, number>

    const videos = parseVideoResult($, '.videoUList')

    const pornstars = parsePornstarResult($, '.channelPornstars ')

    return {
        name,
        url,
        avatar,
        cover,

        ...stats,

        about,

        videos,
        pornstars,
    }
}
