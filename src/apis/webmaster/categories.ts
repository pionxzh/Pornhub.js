import type { Engine } from '../../core/engine'
import { WebmasterRoute } from '../route'

interface Response {
    categories: Category[]
}

export interface Category {
    id: string
    category: string
}

export async function categories(engine: Engine): Promise<Category[]> {
    try {
        const result = await engine.request.get<Response>(WebmasterRoute.categories())
        return result.categories.sort((a, b) => +a.id - +b.id)
    }
    catch (err) {
        console.error(err)
        return []
    }
}
