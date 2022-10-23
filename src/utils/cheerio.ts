import * as cheerio from 'cheerio'
import type { Cheerio, Element } from 'cheerio'

export function getCheerio(html: string) {
    return cheerio.load(html)
}

export function getAttribute<T, R = T>(el: Cheerio<Element>, name: string, defaultValue: R): T | R
export function getAttribute<T>(el: Cheerio<Element>, name: string): T | null | undefined
export function getAttribute<T, R>(el: Cheerio<Element>, name: string, defaultValue?: R): T | R | null | undefined {
    return <T>el.attr(name) ?? defaultValue
}

export function getDataAttribute<T, R = T>(el: Cheerio<Element>, name: string, defaultValue: R): T | R
export function getDataAttribute<T>(el: Cheerio<Element>, name: string): T | null | undefined
export function getDataAttribute<T, R>(el: Cheerio<Element>, name: string, defaultValue?: R): T | R | null | undefined {
    return <T>el.data(name) ?? defaultValue
}
