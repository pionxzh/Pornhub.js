import { WebmasterRoute } from '../route'
import type { Engine } from '../../core/engine'

export interface WebmasterStars {
    stars: WebmasterStar[]
}

export interface WebmasterStar {
    star: {
        star_name: string
    }
}

export async function stars(engine: Engine): Promise<string[]> {
    try {
        const res = await engine.request.get(WebmasterRoute.stars())
        const result = await res.json() as WebmasterStars
        return result.stars.map(x => x.star.star_name)
    }
    catch (err) {
        console.error(err)
        return []
    }
}
