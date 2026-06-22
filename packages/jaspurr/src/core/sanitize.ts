export const NOT_ALLOWED = /[^\t\n\x20-\x7E]/g;

export function sanitize(text: string): string {
    return text
        .normalize('NFC') // NFC normalization.
        .replace(/\r\n?/g, '\n') // CRLF normalization.
        .replace(new RegExp(NOT_ALLOWED.source, 'gu'), '') // ASCII allowlist.
        .replace(/[ \t]+$/gm, '') // Strip trailing space per line.
        .trim(); // Strip leading/trailing white space.
}
