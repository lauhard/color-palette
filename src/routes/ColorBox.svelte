<script lang="ts">
    import {
        LucideCopy,
        LucideCross,
        LucideTrash,
        LucideTrash2,
        LucideXCircle,
    } from "@lucide/svelte";
    export type ColorBoxEntity = {
        id: string;
        name?: string;
        color: string;
    };
    import Color, { type ColorInstance } from "color";
    let { colorBox = $bindable(), delete:fn }: { colorBox: ColorBoxEntity, delete:(id:string)=>void } = $props();
    let col = $derived<ColorInstance>(Color(colorBox.color));
        
    const colorBoxDelete = (e:MouseEvent)=>{
        fn(colorBox.id);
    }
</script>

<div
    class=" color-box"
    data-color={colorBox.color}
    style="--color:{colorBox.color}"
>
    <button class="btn btn-delete" onclick={colorBoxDelete}>
        <LucideXCircle size="2rem"></LucideXCircle>
    </button>
    <button class="btn btn-copy">
        <LucideCopy></LucideCopy>
    </button>
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
        position: relative;
        .btn {
            border-radius: 50%;
            width: 2rem;
            height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            transition-property: display, opacity;
            transition-timing-function: ease-in-out;
            transition-duration: 400ms;
            transition-behavior: allow-discrete;
        }
        .btn-delete {
            top: -10px;
            right: -5px;
            z-index: 100;
            opacity: 0;
        }
        .btn-copy {
            top: -10px;
            left: -5px;
            z-index: 100;
            opacity: 0;
        }

        @starting-style {
            .btn-delete,
            .btn-copy {
                display: none;
                opacity: 0;
            }
        }

        &:hover {
            .btn-delete,
            .btn-copy {
                display: flex;
                opacity: 1;
            }
        }

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
        border: transparent 2px solid;

        corner-shape: squircle;
        border-radius: 90px;
        transition-property: box-shadow, transform, border;
        transition-duration: 200ms;
        transition-timing-function: ease-in-out;

        input[type="color"] {
            box-sizing: border-box;
            max-width: 120px;
            max-height: 120px;
            width: 100%;
            height: 100%;
            display: block;
            margin: 0;
            padding: 0;
            border: unset;
            outline: none;
            inset: none;
            border-style: unset;
            corner-shape: squircle;
            border-radius: 90px;
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
