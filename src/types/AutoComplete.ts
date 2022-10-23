export interface AutoCompleteItem<T extends number | string> {
    name: string
    slug: string
    rank: T
}

export interface AutoCompleteResponse {
    queries: string[]
    albums: string[]
    models: AutoCompleteItem<number>[]
    pornstars: AutoCompleteItem<number>[]
    channels: AutoCompleteItem<string>[]
    isDdBannedWord: boolean
    popularSearches: string[]
}

export interface AutoCompleteResultItem<T extends number | string> extends AutoCompleteItem<T> {
    url: string
}

export interface AutoCompleteResult {
    queries: string[]
    albums: string[]
    models: AutoCompleteResultItem<number>[]
    pornstars: AutoCompleteResultItem<number>[]
    channels: AutoCompleteResultItem<string>[]
    isDdBannedWord: boolean
    popularSearches: string[]
}
