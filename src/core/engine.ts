import { BASE_URL } from '../utils/constant'
import { Request } from './request'

export class Engine {
    BASE_URL = BASE_URL
    request = new Request()

    constructor() {
        this.request.setHeader('Host', this.BASE_URL.replace('https://', ''))
        this.request.setHeader('Origin', this.BASE_URL)
        this.request.setHeader('Referer', `${this.BASE_URL}/`)
        this.request.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36')

        this.request.setCookie('platform', 'pc')
    }
}

