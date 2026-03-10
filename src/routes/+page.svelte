<script lang="ts">
    import type { ColorPaletteEntity } from "./ColorPalette.svelte";
    import ColorPalette from "./ColorPalette.svelte";
    let paletteName = $state("");

    let colorPaletteList = $state<ColorPaletteEntity[]>([]);

    
</script>

<section class="ccp">
    <h1>Your Cool Color Palettes</h1>
    <a href="/new-palette">Create a Cool Color Palatte</a>

    <div class="palette-container">
        {#each colorPaletteList as colorPalette, i}
            <!-- content here -->
            <ColorPalette bind:colorPalette={colorPaletteList[i]}
            ></ColorPalette>
        {/each}
    </div>
</section>

<style>
.ccp{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    h1{
        text-align: center;
    }

    .palette-creator {
        margin-bottom: 3rem;
        height: 100px;
        position: sticky;
        top:5rem;
    }
    .input-wrapper {
        display: flex;
        flex-direction: row;
        height: fit-content;
        border-radius: 0.5rem;
        border: 1px solid rgba(144, 144, 144, 0.675);
        height: 45px;
        width: 280px;
        &:hover,
        &:has(.palette-name:focus) {
            outline: none;
            height: 55px;
            width: 350px;
            font-size: 1.5rem;
            /* border-color: var(--color-ld-white-500); */
            border: none;
            box-shadow:
                rgba(0, 0, 0, 0.19) 0px 10px 20px,
                rgba(0, 0, 0, 0.23) 0px 6px 6px;
            box-shadow:
                rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
                rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
            box-shadow:
                rgba(17, 17, 26, 0.1) 0px 4px 16px,
                rgba(17, 17, 26, 0.1) 0px 8px 24px,
                rgba(17, 17, 26, 0.1) 0px 16px 56px;

            .btn-add-palette {
                border: 1px solid rgba(144, 144, 144, 0.675);
            }
        }
        transition-property: box-shadow, font-size, width, height;
        transition-duration: 300ms;
        transition-timing-function: ease-in-out;

        .palette-name {
            transition-behavior: allow-discrete;
            outline: none;
            height: auto;
            min-width: 180px;
            width: 100%;
            max-width: 100%;
            border: none;
            margin: 0;
            outline: none;
            box-shadow: none;

            &::placeholder {
                font-weight: 500;
                color: var(--color-ld-black-700);
                font-style: italic;
            }
        }
        .btn-add-palette {
            height: auto;

            flex: 1;
            border: 1px solid rgba(144, 144, 144, 0.675);
            border-radius: 0 0.5rem 0.5rem 0;
            border-right: none;
            border-top: none;
            border-bottom: none;
        }
    }
    .palette-container {
        width: 100%;
        min-height: 80vh;
        height: max-content;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
