## API

Reactive primitives:

- `state(initialValue: any): State`

- `computed(reactives: Reactive[], compute: () => any): Computed`

- `effect(reactives: Reactive[], run: () => any): void`

MintElement factories:

- `component(render: (props) => MintNode): ComponentFactory`

- `show(when: Reactive, ...nodes: MintNode[]): MintElement`

- `map(reactiveArray: Reactive<any[]>, renderItem: (item) => MintNode): MintElement`

Component lifecycle:

- `onMount(callback: () => any): void`

- `onDestroy(callback: () => any): void`
