export interface AutoCompleteItem<T extends number | string> {
    name: string
    slug: string
    rank: T
}

export interface AutoCompleteResponse {
    queries?: string[]
    albums?: string[]
    models?: Array<AutoCompleteItem<number>>
    pornstars?: Array<AutoCompleteItem<number>>
    channels?: Array<AutoCompleteItem<string>>
    isDdBannedWord: 'true' | 'false'
    popularSearches?: string[]
}

export interface AutoCompleteResultItem<T extends number | string> extends AutoCompleteItem<T> {
    url: string
}

export interface AutoCompleteResult {
    queries: string[]
    albums: string[]
    models: Array<AutoCompleteResultItem<number>>
    pornstars: Array<AutoCompleteResultItem<number>>
    channels: Array<AutoCompleteResultItem<string>>
    isDdBannedWord: boolean
    popularSearches: string[]
}
