export type Layer = 'primitive' | 'components';
export interface Story {
    name: string;
    layer: Layer;
    render: () => React.ReactNode;
}
