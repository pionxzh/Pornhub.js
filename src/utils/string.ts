/**
 * "luna test 1" => "luna+test+1"
 * "  luna    +test+1 " => "luna+test+1"
 */
export function searchify(keyword: string) {
    return keyword
        .replace(/[^a-zA-Z0-9\s]/g, ' ')
        .trim()
        .split(/\s+/)
        .join('+')
}

/**
 * ['uncategorized', 'transgender', 'straight', 'misc', 'male', 'gay', 'female']
 * => 'female-gay-male-misc-straight-transgender-uncategorized'
 */
export function dashify(keywords: string | string[]) {
    if (!Array.isArray(keywords)) return keywords.trim()

    return keywords
        .map(keyword => keyword.trim())
        .filter(keyword => keyword.length > 0)
        .sort((a, b) => a.localeCompare(b))
        .join('-')
}

/**
 * "Eva Elfie" => "eva-elfie"
 * "Luna Okko" => "luna-okko"
 */
export function slugify(keyword: string) {
    return keyword
        .replace(/[^a-zA-Z0-9\s]/g, ' ')
        .trim()
        .split(/\s+/)
        .join('-')
}
