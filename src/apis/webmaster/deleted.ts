import { WebmasterRoute } from '../route'
import type { Engine } from '../../core/engine'

export interface WebmasterDeleted {
    videos: DeletedVideo[]
}

export interface DeletedVideo {
    vkey: string
    deleted_on: string
}

export async function deleted(engine: Engine, page: number): Promise<DeletedVideo[]> {
    try {
        const res = await engine.request.get(WebmasterRoute.deletedVideos(page))
        const result = await res.json() as WebmasterDeleted
        return result.videos
    }
    catch (err) {
        console.error(err)
        return []
    }
}
