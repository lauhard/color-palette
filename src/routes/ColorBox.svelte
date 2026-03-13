<script lang="ts">
    import type { ColorBoxEntity } from "$lib/server/db/local/schema";
    import {
        LucideClipboardCopy,
        LucideCopy,
        LucideXCircle,
    } from "@lucide/svelte";
   
    import Color, { type ColorInstance } from "color";
    let {
        colorBox = $bindable(),
        ondelete: fn,
        ...rest
    }: {
        colorBox: ColorBoxEntity;
        ondelete: (id: string) => void;
    } = $props();
    let col = $derived<ColorInstance>(Color(colorBox.color));
    let isDeleteing = $state(false);
    const colorBoxDelete = (e: MouseEvent) => {
        isDeleteing = true;
        setTimeout(() => {
            fn(colorBox.id);
            isDeleteing = false;
        }, 100);
    };
    const colorCopy = (e: MouseEvent) => {
        console.log("copy");
    };
</script>

<div
    id={colorBox.id}
    data-color={colorBox.color}
    data-name={colorBox.name}
    class:deleting={isDeleteing === true}
    class=" color-box"
    style="--color:{colorBox.color}"
    {...rest}
>
    <button class="btn btn-delete" onclick={colorBoxDelete}>
        <LucideXCircle size="3rem"></LucideXCircle>
    </button>

    <input
        type="color"
        bind:value={colorBox.color}
        name={colorBox.color}
        id={colorBox.id}
    />
    <div class="color-wrapper">
        <button class="btn btn-color-copy" onclick={colorCopy}>
            <LucideClipboardCopy></LucideClipboardCopy>
        </button>
        <input type="text" bind:value={colorBox.color} class="color-label" />
    </div>
</div>

<style>
    .color-box {
        position: relative;
        width: inherit;
        height: auto;
        /* max-width: 120px;
        max-height: 120px; */
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
        overflow: hidden;

        .btn-delete {
            transition-behavior: allow-discrete;

            border: none;
            box-shadow: none;
            margin-inline: 0;
            padding-inline: 0;
            margin: 0;
            padding: 0;

            min-width: fit-content;
            min-height: fit-content;
            max-height: 1.8rem;

            justify-content: center;
            align-items: center;
            border-radius: 100%;

            aspect-ratio: 1/1;

            display: none;
            opacity: 0;

            transition-property: display, opacity;
            transition-timing-function: ease-in-out;
            transition-duration: 400ms;
            background-color: #363232a9;

            position: absolute;
            right:15px;
            top:8px;

            & :global(svg) {
                height: 100%;
                stroke: #eadddd;
                margin: 0;
                padding: 0;
                min-width: 0;
                min-height: 0;
                margin-inline: 0;
                padding-inline: 0;
                width: 100%;
                height: 100%;
            }
        }

        &:hover {
            .btn-delete {
                display: flex;
                opacity: 1;

                @starting-style {
                    opacity: 0;
                }
            }
        }

        input[type="color"] {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            display: block;
            margin: 0;
            padding: 0;
            border: transparent;
            outline: transparent;
            box-shadow: unset;
            inset: none;
            /* border-style: unset; */
            corner-shape: squircle;
            border-radius: 90px;
            &:focus,
            &:hover,
            &:active {
                border: transparent;
                box-shadow: unset;
            }
        }

        input[type="color"]::-webkit-color-swatch-wrapper,
        input[type="color"]::-webkit-color-swatch,
        input[type="color"]::-moz-color-swatch {
            padding: 0;
            border-radius: 0;
            border: transparent;
            box-shadow: unset;
            &:focus,
            &:hover,
            &:active {
                border: transparent;
                box-shadow: unset;
            }
        }
        input[type="color"]::-webkit-color-swatch {
            padding: 0;
            border-radius: 0;
            border: transparent;
            box-shadow: unset;
        }
        .color-wrapper {
            margin-top: 35px;
            position: absolute;
            max-width: inherit;
            margin-inline-start: 0.1rem;
            display: flex;
            justify-content: center;
            background-color: #363232a9;
            align-items: center;
            corner-shape: squircle;
            border-radius: 90px;
            overflow: hidden;
        }
        .btn-color-copy {
            height: 100%;
            margin: 0;
            padding: 0;
            max-width: 35px;
            position: relative;
            border-radius: 0%;
            background-color: transparent;
            border: transparent;
            outline: transparent;
            position: relative;
            z-index: 100;
            color: #f5f0f0;
            & :global(svg) {
                stroke-width: 2px;
            }
        }
        .color-label {
            position: relative;
            width: inherit;
            display: inline-block;
            max-width: fit-content;
            width: fit-content;
            field-sizing: content;
            background-color: transparent;
            text-align: center;
            font-weight: bold;
            letter-spacing: 2px;
            border: transparent;
            padding:0;
            padding-inline: 0.2rem;
            margin: 0.2rem;
            margin-inline-start: 0;
            font-size: 1rem;
            color: #f5f0f0;
        }
    }
   
    .deleting {
        border-radius: 100%;

        .color,
        input[type="color"] {
            opacity: 0;
        }
        .btn-delete,
        .btn {
            display: none !important;
            opacity: 0;
        }

        opacity: 0;
        min-height: 0px;
        min-width: 0px;
        transform: translateX(-100px);
        transition-property: min-width, min-height, opacity, transform;
        transition-timing-function: ease-out;
        transition-duration: 200ms;
    }
</style>
