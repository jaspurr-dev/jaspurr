export interface Template {
    readonly id: string;
    readonly name: string;
}

export interface Composition {
    templateId: string;
}
