import type { Engine } from '../core/engine'
import type { AutoCompleteOptions } from '../types'
import type { AutoCompleteResponse } from '../types/AutoComplete'
import { getToken } from './getToken'
import { Route } from './route'

export async function getAutoComplete(engine: Engine, keyword: string, options: AutoCompleteOptions) {
    const token = options.token ?? await getToken(engine)
    const result = await engine.request.get<AutoCompleteResponse>(Route.autocomplete(keyword, {
        ...options,
        token,
    }))

    return {
        ...result,
        models: result.models?.map(item => ({
            ...item,
            url: Route.modelPage(item.slug),
        })).sort((a, b) => a.rank - b.rank) ?? [],
        pornstars: result.pornstars?.map(item => ({
            ...item,
            url: Route.pornstarPage(item.slug),
        })).sort((a, b) => a.rank - b.rank) ?? [],
        channels: result.channels?.map(item => ({
            ...item,
            url: Route.channelPage(item.slug),
        })).sort((a, b) => +a.rank - +b.rank) ?? [],
    }
}
