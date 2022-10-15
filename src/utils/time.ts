export function toHHMMSS(sec: number) {
    const hours = Math.floor(sec / 3600)
    const minutes = Math.floor(sec / 60) % 60
    const seconds = sec % 60

    return [hours, minutes, seconds]
        .map(v => v < 10 ? `0${v}` : v)
        .filter((v, i) => v !== '00' || i > 0)
        .join(':')
}
