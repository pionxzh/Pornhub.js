import type { CheerioAPI } from 'cheerio'
import type { Counting, Paging } from '../../types'

export function parsePaging($: CheerioAPI): Paging {
    const current = parseInt($('li.page_current').text())
    const nextPage = $('li.page_next')
    const maxPage = nextPage.length ? parseInt($('li.page_next').prev('li').text()) : current
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
            from: parseInt(from),
            to: parseInt(to),
            total: parseInt(total),
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
