<script lang="ts">
    import Color, { type ColorInstance } from "color";
    import ColorBox, { type ColorBoxEntity } from "./ColorBox.svelte";
    import { LucideCirclePlus, LucidePen } from "@lucide/svelte";
    let paletteName = $state("First Palette");
    const addPalette = (e: SubmitEvent) => {
        e.preventDefault();
    };

    let color = $state("#66606");

    let colorPalette = $state<ColorBoxEntity[]>([]);

    const addColorBox = () => {
        const id = crypto.randomUUID();
        let colorBox: ColorBoxEntity = {
            name: "some name",
            id: id,
            color:
                colorPalette.length > 0
                    ? colorPalette[colorPalette.length - 1].color
                    : "#ffffff",
        };
        colorPalette = [...colorPalette, colorBox];
    };
</script>

<form onsubmit={addPalette}>
    <input bind:value={paletteName} type="text" name="" id="" />
    <button class="btn">add palette</button>
</form>

<div class="palette-container">
    <div class="palette" style="--palette-color:{color}">
        <div class="palette-header">
            <div>
                <input type="text" bind:value={paletteName} />
                <LucidePen></LucidePen>
            </div>
            <div>
                <input type="color" bind:value={color} name={color} />
                <LucidePen></LucidePen>
            </div>
        </div>
        <div class="palette-color-boxes">
            {#each colorPalette as colorBox, i}
                <ColorBox bind:colorBox={colorPalette[i]}></ColorBox>
            {/each}
            <button class="btn" onclick={addColorBox}
                ><LucideCirclePlus size="2rem"></LucideCirclePlus>
            </button>
        </div>
    </div>
</div>

<style>
    .palette-container {
        width: 80%;
        min-height: 80vh;
        height: max-content;
        background-color: aliceblue;
        display: flex;
        flex-direction: column;
    }
    .palette {
        background-color: var(--palette-color);
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
    }
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
    }
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
</style>
