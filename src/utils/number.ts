export function parseReadableNumber(viewsText: string): number {
    if (!viewsText) return 0

    const views = viewsText.replace(/,/g, '')
    if (views.includes('K')) {
        return Number.parseFloat(views) * 1000
    }
    else if (views.includes('M')) {
        return Number.parseFloat(views) * 1000000
    }
    else if (views.includes('B')) {
        return Number.parseFloat(views) * 1000000000
    }
    else {
        return Number.parseFloat(views)
    }
}
