export function sanitize(text: string): string {
    return text.normalize('NFC').replace(/[^\t\n\x20-\x7E]/g, '');
}
