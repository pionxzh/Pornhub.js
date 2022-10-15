import type { Engine } from '../../core/engine'
import { WebmasterRoute } from '../route'

interface Response {
    videos: DeletedVideo[]
}

export interface DeletedVideo {
    vkey: string
    deleted_on: string
}

export async function deleted(engine: Engine, page: number): Promise<DeletedVideo[]> {
    try {
        const result = await engine.request.get<Response>(WebmasterRoute.deletedVideos(page))
        return result.videos
    }
    catch (err) {
        console.error(err)
        return []
    }
}
