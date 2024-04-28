import { UrlParser } from '../../utils/url'
import { WebmasterRoute } from '../route'
import type { Engine } from '../../core/engine'

export type WebmasterVideoIsActive =
    {
        active: {
            video_id: string
            is_active: '1' | '0'
        }
    } | {
        code: string // '2002' stands for "No video with this ID."
        message: string
        example: string
    }

export async function video_is_active(engine: Engine, urlOrId: string): Promise<boolean> {
    try {
        const id = UrlParser.getVideoID(urlOrId)
        const res = await engine.request.get(WebmasterRoute.isVideoActive(id))
        const result = await res.json() as WebmasterVideoIsActive

        if ('code' in result) throw new Error(result.message)

        return result.active.is_active === '1'
    }
    catch (err) {
        console.error(err)
        return false
    }
}
