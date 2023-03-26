import { WebmasterRoute } from '../route'
import type { Engine } from '../../core/engine'

export interface WebmasterStarsDetailed {
    stars: Array<{ star: DetailedStar }>
}

export interface DetailedStar {
    star_name: string
    star_thumb: string
    star_url: string
    gender: 'male' | 'female' | (string & {})
    videos_count_all: string
}

export async function stars_detailed(engine: Engine): Promise<DetailedStar[]> {
    try {
        const result = await engine.request.get<WebmasterStarsDetailed>(WebmasterRoute.stars_detailed())
        return result.stars.map(x => x.star)
    }
    catch (err) {
        console.error(err)
        return []
    }
}
