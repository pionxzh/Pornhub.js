export function parseReadableNumber(viewsText: string): number {
    const views = viewsText.replace(/,/g, '')
    if (views.includes('K')) {
        return parseFloat(views) * 1000
    }
    else if (views.includes('M')) {
        return parseFloat(views) * 1000000
    }
    else if (views.includes('B')) {
        return parseFloat(views) * 1000000000
    }
    else {
        return parseFloat(views)
    }
}
