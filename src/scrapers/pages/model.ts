import { Route } from '../../apis'
import { getAttribute, getCheerio, getDataAttribute } from '../../utils/cheerio'
import { parseReadableNumber } from '../../utils/number'
import { UrlParser } from '../../utils/url'
import { parseCounting, parsePaging } from '../search/base'
import { parseVideoResult } from '../search/video'
import type { Engine } from '../../core/engine'
import type { Counting, Paging } from '../../types'
import type { ModelVideoListOptions } from '../../types/ListOptions'
import type { VideoListResult } from '../search/video'
import type { CheerioAPI } from 'cheerio'

export interface ModelPage {
    name: string
    about: string
    bio: string
    avatar: string
    cover: string
    rank: number
    verified: boolean
    awarded: boolean
    premium: boolean
    subscribers: number
    featuredIn: Array<{ name: string; url: string }>

    uploadedVideoCount: number
    taggedVideoCount: number

    gender?: string
    born?: string
    birthPlace?: string
    starSign?: string
    measurements?: string
    endowment?: string
    relationship?: 'Open' | 'Taken' | 'Single' | (string & {})
    interestedIn?: string
    cityAndCountry?: string
    careerStatus?: string
    careerStartAndEnd?: string
    height?: string
    weight?: string
    ethnicity?: string
    background?: string
    hairColor?: string
    eyeColor?: string
    fakeBoobs?: string
    tattoos?: string
    piercings?: string
    interests?: string
    videoWatched?: number
    turnOns?: string
    turnOffs?: string
    videoViews?: number
    profileViews?: number

    socials: {
        website?: string
        twitter?: string
        instagram?: string
        snapchat?: string
        modelhub?: string
        amazonWishList?: string
    }

    mostRecentVideos: VideoListResult[]
}

const defaultMapper = (value: string) => value
const yesNoMapper = (value: string) => value === 'Yes'
const stripeSpaceMapper = (value: string) => value.split(/\s+/).join(' ')
const numberMapper = (value: string) => parseReadableNumber(value)
const DefaultMapper = {
    key: defaultMapper,
    value: defaultMapper,
}
const KeyMapper: Record<string, {
    key: (key: string) => keyof ModelPage
    value: (value: string) => string | boolean | number
}> = {
    'Relationship status': {
        key: () => 'relationship',
        value: defaultMapper,
    },
    'Interested in': {
        key: () => 'interestedIn',
        value: defaultMapper,
    },
    'Gender': {
        key: () => 'gender',
        value: defaultMapper,
    },
    'Height': {
        key: () => 'height',
        value: defaultMapper,
    },
    'Weight': {
        key: () => 'weight',
        value: defaultMapper,
    },
    'Ethnicity': {
        key: () => 'ethnicity',
        value: defaultMapper,
    },
    'Background': {
        key: () => 'background',
        value: defaultMapper,
    },
    'Hair Color': {
        key: () => 'hairColor',
        value: defaultMapper,
    },
    'Eye Color': {
        key: () => 'eyeColor',
        value: defaultMapper,
    },
    'Fake Boobs': {
        key: () => 'fakeBoobs',
        value: yesNoMapper,
    },
    'Tattoos': {
        key: () => 'tattoos',
        value: yesNoMapper,
    },
    'Piercings': {
        key: () => 'piercings',
        value: yesNoMapper,
    },
    'Video Views': {
        key: () => 'videoViews',
        value: numberMapper,
    },
    'Profile Views': {
        key: () => 'profileViews',
        value: numberMapper,
    },
    'Videos Watched': {
        key: () => 'videoWatched',
        value: numberMapper,
    },
    'Turn Ons': {
        key: () => 'turnOns',
        value: defaultMapper,
    },
    'Turn Offs': {
        key: () => 'turnOffs',
        value: defaultMapper,
    },
    'Interests and hobbies': {
        key: () => 'interests',
        value: defaultMapper,
    },
    'Born': {
        key: () => 'born',
        value: defaultMapper,
    },
    'Birth Place': {
        key: () => 'birthPlace',
        value: defaultMapper,
    },
    'Birthplace': {
        key: () => 'birthPlace',
        value: defaultMapper,
    },
    'Star Sign': {
        key: () => 'starSign',
        value: defaultMapper,

    },
    'Measurements': {
        key: () => 'measurements',
        value: defaultMapper,
    },
    'City and Country': {
        key: () => 'cityAndCountry',
        value: defaultMapper,
    },
    'Endowment': {
        key: () => 'endowment',
        value: defaultMapper,
    },
    'Career Status': {
        key: () => 'careerStatus',
        value: defaultMapper,
    },
    'Career Start and End': {
        key: () => 'careerStartAndEnd',
        value: stripeSpaceMapper,
    },
}

const parseVideoCount = (text: string) => {
    // "Showing 1-XX of YY"
    if (!text) return 0

    const match = text.match(/Showing \d+-\d+ of (\d+)/)
    if (match) return parseReadableNumber(match[1])

    return 0
}

export async function modelPage(engine: Engine, urlOrName: string): Promise<ModelPage> {
    const name = UrlParser.getModelName(urlOrName)
    if (!name) throw new Error(`Invalid model input: ${urlOrName}`)

    const url = Route.modelPage(name)
    const html = await engine.request.raw(url)
    const $ = getCheerio(html)

    return parseInfo($)
}

export async function modelUploadedVideos(engine: Engine, urlOrName: string, options: ModelVideoListOptions): Promise<{
    data: VideoListResult[]
    paging: Paging
    counting: Counting
}> {
    const name = UrlParser.getModelName(urlOrName)
    if (!name) throw new Error(`Invalid model input: ${urlOrName}`)

    const url = Route.modelVideosPage(name, options.page ?? 1)
    const html = await engine.request.raw(url)
    const $ = getCheerio(html)

    return {
        data: parseVideoResult($, '.videoUList'),
        paging: parsePaging($),
        counting: parseCounting($),
    }
}

function parseInfo($: CheerioAPI): ModelPage {
    const infoPieces = $('div.infoPiece').toArray()
    const info = Object.fromEntries(infoPieces.map((el) => {
        const item = $(el)
        const key = item.find('span:nth-child(1)').text().trim().replace(':', '')
        const value = item.find('span:nth-child(2)').text().trim()
            || item.text().replace(item.find('span:nth-child(1)').text(), '').trim()
        const mapper = KeyMapper[key] || DefaultMapper
        return [mapper.key(key), mapper.value(value)]
    }))

    const name = $('.nameSubscribe > .name').text().trim()

    const rankEl = $('div.rankingInfo > .infoBox > span')
    const rank = parseReadableNumber(rankEl.text().trim())

    const avatarEl = $('img#getAvatar, .topProfileHeader > .thumbImage > img')
    const avatar = getAttribute<string>(avatarEl, 'src', '')

    const coverEl = $('img#coverPictureDefault, .topProfileHeader > .coverImage > img')
    const cover = getAttribute<string>(coverEl, 'src', '')

    const aboutEl = $('section.aboutMeSection > div:nth-child(2)')
    const about = aboutEl.text().trim()

    const bioEl = $('.biographyText .content div[itemprop="description"], .bio:not(:has(.aboutMeSection)) > .text')
    const bio = stripeSpaceMapper(bioEl.text().trim())

    const verifiedEl = $('.badge-username > .verifiedPornstar')
    const verified = !!verifiedEl.length

    const awardEl = $('.badge-username > .trophyPornStar')
    const awarded = !!awardEl.length

    const premiumEl = $('.badge-username > .premium-icon')
    const premium = !!premiumEl.length

    const subscribersEl = $('div.tooltipTrig.infoBox[data-title^="Subscribers:"]')
    const subscribersText = getDataAttribute<string>(subscribersEl, 'title', '')
        .replace('Subscribers: ', '')
    const subscribersText2 = $('div.infoBox:has(.title:contains("Subscribers")) > span').text().trim()
    const subscribers = parseReadableNumber(subscribersText) || parseReadableNumber(subscribersText2)

    const featuredIn = $('div.featuredIn > a')
        .toArray()
        .map((el) => {
            const item = $(el)
            const name = item.text().trim()
            const url = getAttribute<string>(item, 'href', '')
            return { name, url }
        })
        .filter(item => item.name && item.url)

    let uploadedVideoCount = 0
    const taggedVideoCount = 0
    if (verified) {
        const recentVideoCountEl = $('.mostRecentPornstarVideos > .pornstarVideosCounter')
        uploadedVideoCount = parseVideoCount(recentVideoCountEl.text().trim())

        // looks like model page doesn't have tagged video count
    }
    else {
        // there is no unverified model :D
    }

    const socials = {
        website: getAttribute<string>($('.socialList a:has(.officialSiteIcon)'), 'href'),
        twitter: getAttribute<string>($('.socialList a:has(.twitterIcon)'), 'href'),
        instagram: getAttribute<string>($('.socialList a:has(.instagramIcon)'), 'href'),
        snapchat: getAttribute<string>($('.socialList a:has(.snapchatIcon)'), 'href'),
        modelhub: getAttribute<string>($('.socialList a:has(.modelhubIcon)'), 'href'),
        amazonWishList: getAttribute<string>($('.socialList a:has(.amazonWishlistIcon)'), 'href')
            || getAttribute<string>($('.socialList a:has(.amazonWLIcon)'), 'href'),
    }

    const mostRecentVideos = parseVideoResult($, '.mostRecentPornstarVideos')

    return {
        name,
        about,
        bio,
        avatar,
        cover,
        rank,
        verified,
        awarded,
        premium,
        subscribers,
        featuredIn,
        uploadedVideoCount,
        taggedVideoCount,
        ...info,
        socials,
        mostRecentVideos,
    } as ModelPage
}
