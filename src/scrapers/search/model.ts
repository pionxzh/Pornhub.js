import type { Engine } from '../../core/engine'
import type { AutoCompleteOptions } from '../../types'
import { getAutoComplete } from '../../apis/autoComplete'
import type { AutoCompleteResultItem } from '../../types/AutoComplete'

export interface ModelSearchResult {
    name: string
    url: string
    views: string
    videoNum: number
    rank: number
    photo: string
}

export async function modelSearch(engine: Engine, keyword: string, options: AutoCompleteOptions = {}): Promise<AutoCompleteResultItem<number>[]> {
    const result = await getAutoComplete(engine, keyword, options)
    return result.models
}