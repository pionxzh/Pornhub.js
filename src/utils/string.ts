/**
 * Transform a string into a search keyword that can be used in search.
 *
 * @example
 * "luna test 1" => "luna+test+1"
 * "  luna    +test+1 " => "luna+test+1"
 * "（香港］ +学 生" => "香港+学+生"
 */
export function searchify(keyword: string) {
    return keyword
        .replace(/^[ \t]+|[ \t]+$/gi, '')
        .replace(/[\.,'/:=\(\)&!\?@\[\]"\*\$#%\^;\|`\\~><¿\{\}\+]/gi, ' ')
        .replace(/[éèëê]/gi, 'e')
        .replace(/[äàâ]/gi, 'a')
        .replace(/[üùû]/gi, 'u')
        .replace(/[îï]/gi, 'i')
        .replace(/ô/gi, 'o')
        .replace(/ç/gi, 'c')
        .replace(/【/gi, '')
        .replace(/】/gi, '')
        .replace(/〈/gi, '')
        .replace(/〉/gi, '')
        .replace(/〖/gi, '')
        .replace(/〗/gi, '')
        .replace(/（/gi, '')
        .replace(/）/gi, '')
        // eslint-disable-next-line no-irregular-whitespace
        .replace(/　/gi, '')
        .replace(/〔/gi, '')
        .replace(/〕/gi, '')
        .replace(/『/gi, '')
        .replace(/』/gi, '')
        .replace(/］/gi, '')
        .replace(/［/gi, '')
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
