<script lang="ts">
    import Color, { type ColorInstance } from "color";
    import ColorBox, { type ColorBoxEntity } from "./ColorBox.svelte";
    let paletteName = $state("");
    const addPalette = (e: SubmitEvent) => {
        e.preventDefault();
    };
    
    let color= $state("#ffff");
    let col = $derived<ColorInstance>(Color(color))
   
    let colorPalette =$state<ColorBoxEntity[]>([]);

    const addColorBox=()=>{
        const id = crypto.randomUUID();
        let colorBox:ColorBoxEntity={
            name: "some name",
            id:id,
            color: colorPalette.length > 0 ? colorPalette[colorPalette.length-1].color : "#ffffff"
        }
        colorPalette=[...colorPalette, colorBox];
    }
    //add a div as a grid to the page
</script>

<form onsubmit={addPalette}>
    <input bind:value={paletteName} type="text" name="" id="" />
    <button class="btn">add palette</button>
</form>

<div class="palette-container">
    <div class="palette">
        {#each colorPalette as colorBox}
             <!-- content here -->
            <ColorBox {colorBox}></ColorBox>
        {/each}
        <button class="btn" onclick={addColorBox}>add color</button>
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
        gap: 1rem;
    }
    .palette {
        display: grid;
        grid-template-columns: repeat(7, minmax(120px, 1fr));
        background-color: rgb(223, 232, 232);
        gap: 1rem;
        border-radius: 10px;
        min-height: 140px;
    }
   
</style>
