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
