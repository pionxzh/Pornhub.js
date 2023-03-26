import { getAutoComplete } from '../../apis/autoComplete'
import type { Engine } from '../../core/engine'
import type { AutoCompleteOptions } from '../../types'
import type { AutoCompleteResultItem } from '../../types/AutoComplete'

export async function modelSearch(engine: Engine, keyword: string, options: AutoCompleteOptions = {}): Promise<Array<AutoCompleteResultItem<number>>> {
    const result = await getAutoComplete(engine, keyword, options)
    return result.models
}
