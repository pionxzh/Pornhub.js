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
