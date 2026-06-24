export function entries<K extends PropertyKey, V>(obj: Record<K, V>): [K, V][] {
    return Object.entries(obj) as [K, V][];
}
