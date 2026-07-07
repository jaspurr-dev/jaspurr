export type Layer = 'component' | 'composite';
export interface Story {
    name: string;
    layer: Layer;
    render: () => React.ReactNode;
}
