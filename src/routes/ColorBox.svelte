<script lang="ts">
    export type ColorBoxEntity = {
        id: string;
        name?: string;
        color: string;
    };
    import Color, { type ColorInstance } from "color";
    let { colorBox=$bindable() }: { colorBox: ColorBoxEntity }=$props();
    let color = $state(colorBox.color);
    
    
    
    let col = $derived<ColorInstance>(Color(color));
</script>

<div class=" color-box" data-color="#565656">
    <input type="color" bind:value={colorBox.color} name="#565656" id={colorBox.id} />
    <input
        type="text"
        bind:value={colorBox.color}
        class:dark={col.isDark}
        class="color"
    />
</div>

<style>
    .color-box {
        /* background-color: attr(data-color type(<color>), white); */
        width: inherit;
        height: auto;
        aspect-ratio: 1 / 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        overflow: hidden;

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
            border-color: transparent;
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
            background-color: white;
            border: transparent;
            padding-block: 0.5rem;
            font-size: 1rem;
            color: black;
            padding-inline: 5px;
            border-radius: 10px;
        }
        .dark {
            background-color: black;
            color: white;
        }
    }
</style>
