<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        children,
        id,
        ondrop: fn,
        style
    }: {
        children?: Snippet;
        id: string;
        ondrop: (event: DragEvent, targetId: string) => void;
        style?:string;
    } = $props();
    const dropHandler = (event: DragEvent) => {
        showDropzone = false;
        fn(event, id);
    };
    let showDropzone = $state(false);
</script>

<div
    class:dropzone={showDropzone}
    style="{style}"
    id={id}
    data-droptarget={id}
    ondrop={dropHandler}
    ondragover={(event) => {
        event.preventDefault();
        showDropzone = true;
    }}
    ondragenter={(event) => {
        event.preventDefault();

        showDropzone = true;
    }}
    ondragleave={(event) => {
        event.preventDefault();

        showDropzone = false;
    }}
    role="region"
>
    {@render children?.()}
</div>
