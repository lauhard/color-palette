<script lang="ts">
    import type { Snippet } from "svelte";
    import "./dragdrop.css";
    let {
        children,
        id,
        ondragstart: fn,
        style,
    }: {
        children: Snippet;
        id: string;
        ondragstart?: (event: DragEvent, targetId: string) => void;
        style?:string;
    } = $props();
    const dragStartHandler = (event: DragEvent) => {
        isDragging = true;
        event.dataTransfer?.setData("text/plain", id);
        if (fn) fn(event, id);
    };
    const dragEndHandler = (event: DragEvent) => {
        isDragging = false;
    };
    let isDragging = $state(false);
</script>

<div
    class="draggable"
    class:dragging={isDragging}
    style="{style}"
    data-dragtarget={id}
    ondragstart={dragStartHandler}
    ondragend={dragEndHandler}
    role="region"
    draggable="true"
>
    {@render children()}
</div>
