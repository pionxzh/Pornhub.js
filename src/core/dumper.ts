import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import createDebug from 'debug'
import type { Request } from './request'

const debug = createDebug('DUMP')

export class Dumper {
    constructor(private request: Request) {}

    enable(_dumpPagePath: string) {
        const dumpPagePath = _dumpPagePath ? path.resolve(_dumpPagePath) : path.join(process.cwd(), '_dump')
        if (!fs.existsSync(dumpPagePath)) {
            fs.mkdirSync(dumpPagePath, { recursive: true })
        }

        this.request.eventEmitter.on('responseHTML', ({ url, html }) => {
            const normalizedPath = this.getNormalizedUrlPath(url)
            const filename = `${normalizedPath}.html`
            const filePath = path.join(dumpPagePath, filename)
            debug(filePath)
            fs.writeFileSync(filePath, html)
        })

        this.request.eventEmitter.on('responseJSON', ({ url, json }) => {
            const normalizedPath = this.getNormalizedUrlPath(url)
            const filename = `${normalizedPath}.json`
            const filePath = path.join(dumpPagePath, filename)
            debug(filePath)
            fs.writeFileSync(filePath, JSON.stringify(json, null, 4))
        })
    }

    private getNormalizedUrlPath(url: URL) {
        const now = Date.now()
        const path = url.pathname
            .replace(/\/$/, '')
            .replace(/\//g, '_')
            || 'index'
        return `${now}_${path}`
    }
}
