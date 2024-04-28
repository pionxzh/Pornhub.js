import { UrlParser } from '../../utils/url'
import { WebmasterRoute } from '../route'
import type { Engine } from '../../core/engine'

export type WebmasterEmbed =
    {
        embed: {
            code: string
        }
    } | {
        code: string // '2002' stands for "No video with this ID."
        message: string
        example: string
    }

export async function video_embed_code(engine: Engine, urlOrId: string): Promise<string | null> {
    try {
        const id = UrlParser.getVideoID(urlOrId)
        const res = await engine.request.get(WebmasterRoute.video_embed_code(id))
        const result = await res.json() as WebmasterEmbed

        if ('code' in result) throw new Error(result.message)

        return result.embed.code
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
    }
    catch (err) {
        console.error(err)
        return null
    }
}
