<script lang="ts">
    import { resolve } from "$app/paths";
    import { deletePalette, getPalettes } from "$lib/remote/colorpalette.remote";
    import { LucideTrash2 } from "@lucide/svelte";

    const query = getPalettes();
</script>

<section class="ccp">
    <h1>Your Cool Color Palettes</h1>

    <div class="palette-container">
        <svelte:boundary>
            {#if query.error}
                <p>oops!</p>
            {:else if query.loading}
                <p>loading...</p>
            {:else}
                {#each query.current as { id, name, colorBoxes }, i}
                    <div class="color-palette">
                        <button class="btn-trash" onclick={async()=>{
                            await deletePalette(id); query.refresh();
                        }}>
                            <LucideTrash2 ></LucideTrash2>
                        </button>
                        <a href={resolve(`/${id}`)} class="palette-name"
                            >{name}</a
                        >
                        {#each colorBoxes as box}
                            <div class="color" style="--c:{box.color}">
                                <span class="color-label">{box.color}</span>
                            </div>
                        {/each}
                    </div>
                {/each}
                {#if (await query).length === 0}
                    <a href="/new-palette">Create a Cool Color Palatte</a>
                {/if}
            {/if}
        </svelte:boundary>
    </div>
</section>

<style>
    :root {
        --palette-height: 12rem;
    }
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
            .color-palette {
                width: 600px;
                height: var(--palette-height);
                display: flex;
                flex-direction: row;
                align-self: center;
                flex: 1;
                background-color: aliceblue;
                border-radius: 20px;
                overflow: hidden;
                position: relative;
                .btn-trash{
                    padding: 0.2rem;
                    margin:.5rem;
                    background-color: #363232a9;
                    color: #f5f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    border-radius: 100%;
                    z-index: 10;
                    min-width: 35px;
                    min-height: 35px;
                    top:0;
                    left:0;
                }
                .palette-name {
                    position: absolute;
                    color: #f5f0f0;
                    background-color: #363232a9;
                    min-width: fit-content;
                    text-align: center;
                    height: fit-content;
                    padding-block: 0.1rem;
                    padding-inline: 1rem;
                    padding-inline-start: 2rem;
                    top: 0px;
                    right: 0px;
                    font-weight: bold;
                    border-bottom-left-radius: 50px;
                    z-index: 10;
                }
                .color {
                    width: 100%;
                    position: relative;
                    display: block;
                    height: var(--palette-height);
                    background: var(--c);
                    .color-label {
                        position: absolute;
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
                        padding: 0;
                        padding-inline: 0.8rem;
                        bottom: 9px;
                        left: 10px;
                        border-radius: 10px;
                        font-size: 0.9rem;
                        color: #f5f0f0;
                        background-color: #363232a9;
                    }
                }
            }
        }
    }
</style>
