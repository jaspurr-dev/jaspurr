export function sanitize(text: string): string {
    return text.replace(/[^\t\n\x20-\x7E]/g, '');
}
