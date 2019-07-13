module.exports.unescape = function (str) {
    if (typeof str !== 'string') return null

    return str.replace(/\\/g, '')
        .replace(/%2C/g, ',')
        .replace(/%5B/g, '[')
        .replace(/%5D/g, ']')
        .replace(/&amp;/g, '&')
}

module.exports.regexByRules = function (pattern, str = '', nthMatch = 1) {
    const reg = new RegExp(pattern)

    let match = null
    while (nthMatch--) {
        match = reg.exec(str)
    }
    return match
}

module.exports.decodeStrToList = function (str) {
    try {
        return decodeURIComponent(str).split(',').filter(
            item => item !== ''
        )
    } catch (e) {
        return []
    }
}

// https://ci.phncdn.com/pics/pornstars/000/002/190/(m=lciuhScOb_c)(mh=y8jot66fDRXSMiYW)thumb_00000.jpg
// => https://ci.phncdn.com/pics/pornstars/000/002/190/thumb_00000.jpg
module.exports.removeProtectionBracket = str => str.replace(/\(.+?\)/g, '')
