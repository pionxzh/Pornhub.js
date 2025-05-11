export function nonNullable<T>(x: T): x is NonNullable<T> {
    return x != null
}

export function unescape(str: string) {
    if (typeof str !== 'string') return null

    return str.replace(/\\/g, '')
        .replace(/%2C/g, ',')
        .replace(/%5B/g, '[')
        .replace(/%5D/g, ']')
        .replace(/&amp;/g, '&')
}

export function removeComma(str: string) {
    return str.replace(/,/g, '')
}

// https://ci.phncdn.com/pics/pornstars/000/002/190/(m=lciuhScOb_c)(mh=y8jot66fDRXSMiYW)thumb_00000.jpg
// => https://ci.phncdn.com/pics/pornstars/000/002/190/thumb_00000.jpg
export const removeProtectionBracket = (str: string) => str.replace(/\(.+?\)/g, '')
