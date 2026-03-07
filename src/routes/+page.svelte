<script lang="ts">
    import type { ColorPaletteEntity } from "./ColorPalette.svelte";
    import ColorPalette from "./ColorPalette.svelte";
    let paletteName = $state("First Palette");

    let colorPaletteList = $state<ColorPaletteEntity[]>([]);

    const addColorPalette = (e:SubmitEvent) => {
        e.preventDefault();
        const id = crypto.randomUUID();
        let colorPalette: ColorPaletteEntity = {
            name: paletteName,
            id: id,
            boxes:[],
            color:"#a3a3a3"
        };
        colorPaletteList = [...colorPaletteList, colorPalette];
    };
</script>

<form onsubmit={addColorPalette}>
    <input bind:value={paletteName} type="text" name="" id="" />
    <button class="btn">add palette</button>
</form>

<div class="palette-container">
   {#each colorPaletteList as colorPalette, i}
     <!-- content here -->
      <ColorPalette bind:colorPalette={colorPaletteList[i]}></ColorPalette>
   {/each}
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
   
   
   
</style>
