<script lang="ts">
    export type ColorBoxEntity = {
        id: string;
        name?: string;
        color: string;
    };
    import Color, { type ColorInstance } from "color";
    let { colorBox = $bindable() }: { colorBox: ColorBoxEntity } = $props();
    let col = $derived<ColorInstance>(Color(colorBox.color));
</script>

<div
    class=" color-box"
    data-color={colorBox.color}
    style="--color:{colorBox.color}"
>
    <input
        type="color"
        bind:value={colorBox.color}
        name={colorBox.color}
        id={colorBox.id}
    />
    <input
        type="text"
        bind:value={colorBox.color}
        class:dark={col.isDark}
        class="color"
    />
</div>

<style>
    .color-box {
        width: inherit;
        height: auto;
        max-width: 120px;
        max-height: 120px;
        aspect-ratio: 1 / 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        background-image:
            radial-gradient(circle at 50% 250%, var(--color), var(--color)),
            linear-gradient(
                90deg,
                color-mix(in oklab, var(--color) 100%, white 90%),
                var(--color)
            );
        background-origin: padding-box, border-box;
        background-clip: padding-box, border-box;
        border: var(--color) 2px solid;
        corner-shape: squircle;
        border-radius: 90px;
        overflow: clip;
        &:hover {
            box-shadow: 2.5px 1px 4px 0.5px rgb(41, 40, 40);
            transform: scale(1.02);
            border: transparent 2px solid;
        }
        transition-property: box-shadow, transform, border;
        transition-duration: 200ms;
        transition-timing-function: ease-in-out;

        input[type="color"] {
            height: 100%;
            width: 100%;
            display: block;
            margin: 0;
            padding: 0;
            border: none;
            outline: none;
            inset: none;
            border-style: none;
        }
        input[type="color"]::-moz-color-swatch {
            border: none;
        }
        input[type="color"]::-webkit-color-swatch-wrapper {
            padding: 0;
            border-radius: 0;
        }
        input[type="color"]::-webkit-color-swatch {
            border: none;
        }
        .color {
            width: fix-content;
            max-width: 100px;
            display: inline-block;
            position: absolute;
            text-align: center;
            font-weight: bold;
            letter-spacing: 2px;
            background-color: #363232a9;
            border: transparent;
            padding-block: 0.5rem;
            font-size: 1rem;
            color: rgb(245, 240, 240);
            border-radius: 10px;
        }
    }
</style>
