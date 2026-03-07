<script lang="ts">
    export type ColorPaletteEntity = {
        id: string;
        name?: string;
        color: string;
        boxes: ColorBoxEntity[];
    };
    import Color, { type ColorInstance } from "color";
    import type { ColorBoxEntity } from "./ColorBox.svelte";
    import { Boxes, LucideCirclePlus, LucidePen } from "@lucide/svelte";
    import ColorBox from "./ColorBox.svelte";
    let { colorPalette = $bindable() }: { colorPalette: ColorPaletteEntity } =
        $props();
    let col = $derived<ColorInstance>(Color(colorPalette.color));


    const addColorBox = () => {
        const id = crypto.randomUUID();
        let colorBox: ColorBoxEntity = {
            name: "some name",
            id: id,
            color:
                colorPalette.boxes.length > 0
                    ? colorPalette.boxes[colorPalette.boxes.length - 1].color
                    : "#ffffff",
        };
        colorPalette.boxes = [...colorPalette.boxes, colorBox];
    };
    //let newBoxes = [...boxes, !id]
    const deleteColorBox=(id:string)=>{
        let newBoxes = colorPalette.boxes.map(c=>{
            return c.id !== id ? c : null
        }).filter((b)=> b !== null);

        console.log("new palette", newBoxes);
        colorPalette.boxes = [...newBoxes];
    }
</script>

<div class="color-palette" style="--palette-color:{colorPalette.color}">
    <div class="palette-header">
        <div>
            <input type="text" bind:value={colorPalette.name} />
            <LucidePen></LucidePen>
        </div>
        <div>
            <input type="color" bind:value={colorPalette.color} name={colorPalette.color} />
            <LucidePen></LucidePen>
        </div>
    </div>
    <div class="palette-color-boxes">
        {#each colorPalette.boxes as colorBox, i}
            <ColorBox delete={deleteColorBox} colorBox={colorPalette.boxes[i]}></ColorBox>
        {/each}
        <button class="btn" onclick={addColorBox}
            ><LucideCirclePlus size="2rem"></LucideCirclePlus>
        </button>
    </div>
</div>

<style>
    .color-palette {
        background-color: var(--palette-color);
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        .palette-color-boxes {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            border-radius: 10px;
            min-height: 130px;
            padding-inline: 1rem;
            padding-block: 1rem;
            row-gap: 1rem;
            column-gap: 0.5rem;
            align-content: center;
            border-radius: 20px;
            .btn {
                outline: transparent;
                border: transparent;
                width: 120px;
                height: 120px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: wheat;
                background-color: #4a63b0;
                border-radius: 20px;
            }
        }
    }
</style>
