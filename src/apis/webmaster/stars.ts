import type { Engine } from '../../core/engine'
import { WebmasterRoute } from '../route'

interface Response {
    stars: Star[]
}

interface Star {
    star: {
        star_name: string
    }
}

export async function stars(engine: Engine): Promise<string[]> {
    try {
        const result = await engine.request.get<Response>(WebmasterRoute.stars())
        return result.stars.map(x => x.star.star_name)
    }
    catch (err) {
        console.error(err)
        return []
    }
}
