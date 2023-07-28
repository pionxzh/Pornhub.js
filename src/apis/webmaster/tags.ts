import { WebmasterRoute } from '../route'
import type { Engine } from '../../core/engine'

export interface WebmasterTags {
    tagsCount: number
    tags: string[]
}

/**
 * Warning: We had to change the response structure due to high amount of tags. Please adjust your code
 * -- message from the official API
 *
 * I don't know what they actually changed :/
 */
export async function tags(engine: Engine, letter: string): Promise<string[]> {
    try {
        const res = await engine.request.get(WebmasterRoute.tags(letter))
        const result = await res.json() as WebmasterTags
        return result.tags
    }
    catch (err) {
        console.error(err)
        return []
    }
}
