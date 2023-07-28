import { WebmasterRoute } from '../route'
import type { Engine } from '../../core/engine'

export interface WebmasterCategory {
    categories: Category[]
}

export interface Category {
    /**
     * The official API is inconsistent with the type of id.
     * Sometimes it's all numbers, sometimes it's all strings.
     */
    id: number | string
    category: string
}

export async function categories(engine: Engine): Promise<Category[]> {
    try {
        const res = await engine.request.get(WebmasterRoute.categories())
        const result = await res.json() as WebmasterCategory
        return result.categories.sort((a, b) => +a.id - +b.id)
    }
    catch (err) {
        console.error(err)
        return []
    }
}
