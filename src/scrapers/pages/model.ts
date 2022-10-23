import type { CheerioAPI } from 'cheerio'
import { Route } from '../../apis'
import type { Engine } from '../../core/engine'
import { getAttribute, getCheerio, getDataAttribute } from '../../utils/cheerio'
import { parseReadableNumber } from '../../utils/number'
import { UrlParser } from '../../utils/url'

export interface ModelPage {
    name: string
    about: string
    bio: string
    avatar: string
    rank: number
    verified: boolean
    subscribers: number
    featuredIn: { name: string; url: string }[]

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

export async function modelPage(engine: Engine, urlOrName: string): Promise<ModelPage> {
    const name = UrlParser.getModelName(urlOrName)
    if (!name) throw new Error('Invalid pornstar name')

    const url = Route.modelPage(name)
    const html = await engine.request.raw(url)
    const $ = getCheerio(html)

    return parseInfo($)
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
    const avatar = getAttribute(avatarEl, 'src')

    const aboutEl = $('section.aboutMeSection > div:nth-child(2)')
    const about = aboutEl.text().trim()

    const bioEl = $('.biographyText .content div[itemprop="description"], .bio:not(:has(.aboutMeSection)) > .text')
    const bio = stripeSpaceMapper(bioEl.text().trim())

    const verifiedEl = $('.badge-username > .verifiedPornstar')
    const verified = !!verifiedEl.length

    const subscribersEl = $('div.tooltipTrig.infoBox[data-title^="Subscribers:"]')
    const subscribersText = getDataAttribute<string>(subscribersEl, 'title', '')
        .replace('Subscribers: ', '')
    const subscribersText2 = $('div.infoBox:has(.title:contains("Subscribers")) > span').text().trim()
    const subscribers = parseReadableNumber(subscribersText) || parseReadableNumber(subscribersText2)

    const featuredIn = $('div.featuredIn > a').toArray().map((el) => {
        const item = $(el)
        const name = item.text().trim()
        const url = getAttribute(item, 'href')
        return { name, url }
    })

    const socials = {
        website: getAttribute<string>($('a:has(.officialSiteIcon)'), 'href'),
        twitter: getAttribute<string>($('a:has(.twitterIcon)'), 'href'),
        instagram: getAttribute<string>($('a:has(.instagramIcon)'), 'href'),
        snapchat: getAttribute<string>($('a:has(.snapchatIcon)'), 'href'),
        modelhub: getAttribute<string>($('a:has(.modelhubIcon)'), 'href'),
        amazonWishList: getAttribute<string>($('a:has(.amazonWishlistIcon)'), 'href')
            || getAttribute<string>($('a:has(.amazonWLIcon)'), 'href'),
    }

    return {
        name,
        about,
        bio,
        avatar,
        rank,
        verified,
        subscribers,
        featuredIn,
        ...info,
        socials,
    } as ModelPage
}
