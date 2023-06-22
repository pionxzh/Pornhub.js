import type { Counting, Paging } from '../../types'
import type { CheerioAPI } from 'cheerio'

export function parsePaging($: CheerioAPI): Paging {
    const current = Number.parseInt($('li.page_current').text())
    const nextPage = $('li.page_next')
    const maxPage = nextPage.length ? Number.parseInt($('li.page_next').prev('li').text()) : current
    return {
        current,
        maxPage,
        isEnd: !nextPage.length,
    }
}

export function parseCounting($: CheerioAPI): Counting {
    try {
        const counterStr = $('.showingCounter').text()
        const [, from = '0', to = '0', total = '0'] = /(\d+)-(\d+)\sof\s(\d+)/.exec(counterStr) || []
        return {
            from: Number.parseInt(from),
            to: Number.parseInt(to),
            total: Number.parseInt(total),
        }
    }
    catch (err) {
        return {
            from: 0,
            to: 0,
            total: 0,
        }
    }
}
