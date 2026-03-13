<script lang="ts">
    import { LucideDisc2, LucidePencil, LucideSave } from "@lucide/svelte";
    import ColorPalette from "../ColorPalette.svelte";
    import type { ColorPaletteEntity, NewColorPaletteEntity } from "$lib/server/db/local/schema";
    import {
        savePalette,
        updatePalette,
    } from "$lib/remote/colorpalette.remote";

    let paletteName = $state("");

    let colorPalette = $state<NewColorPaletteEntity>({
        name: "cool palette",
        id: "",
        colorBoxes: [],
        color: "#ededed",
    });
    $effect(() => {
        paletteName = colorPalette.name!;
    });

    // let boxes = $derived(JSON.stringify(colorPalette.colorBoxes));
    const save = async () => {
        const data = {
            id: colorPalette.id,
            color: colorPalette.color,
            name: paletteName,
            colorBoxes: colorPalette.colorBoxes,
        };
        console.log("data", data);
        try {
            const response =
                colorPalette.id === ""
                    ? await savePalette(data)
                    : await updatePalette(data as ColorPaletteEntity);
            console.log("response", response);
            colorPalette.id = response?.id ?? "";
        } catch (error) {
            console.log("error", error);
        }
    };
</script>

<section class="ccp">
    <!-- <p><span>boxes: </span>{boxes}</p> -->
    <h1>Create a Cool Color Palette</h1>
    <menu>
        <button class="btn btn-save" onclick={save}>
            <LucideSave></LucideSave>
        </button>
    </menu>
    <div class="palette-container">
        <!-- content here -->
        <ColorPalette bind:colorPalette></ColorPalette>
    </div>
</section>

<style>
    .ccp {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: relative;
        h1 {
            text-align: center;
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
