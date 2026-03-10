<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        children,
        id,
        ondrop: fn,
    }: {
        children: Snippet;
        id: string;
        ondrop: (event: DragEvent, targetId: string) => void;
    } = $props();
    const dropHandler = (event: DragEvent) => {
        showDropzone = false;
        fn(event, id);
    };
    let showDropzone = $state(false);
</script>

<div
    class:dropzone={showDropzone}
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
    {@render children()}
</div>

<style>
    .dropzone {
        border: 2px dashed orangered;
        min-width: fit-content;
        min-height: fit-content;
        corner-shape: squircle;
        padding: 1px;
        border-radius: 90px;
    }
</style>
