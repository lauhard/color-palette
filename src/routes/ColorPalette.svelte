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
    import DropTarget from "./DropTarget.svelte";
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

    //callback delete
    const deleteColorBox = (id: string) => {
        let newBoxes = colorPalette.boxes
            .map((c) => {
                return c.id !== id ? c : null;
            })
            .filter((b) => b !== null);

        console.log("new palette", newBoxes);
        colorPalette.boxes = [...newBoxes];
    };

    //attachment dargstart
    const ondragstart = (Element: HTMLElement) => {
        const dragStartHandler = (event: DragEvent) => {
            event.dataTransfer?.setData(
                "text/plain",
                (event?.target as HTMLElement).id,
            );
        };
        document.addEventListener("dragstart", dragStartHandler);
        return () => {
            document.removeEventListener("dragstart", dragStartHandler, true);
        };
    };

    //callback drop handler
    const dropHandler=(event:DragEvent, targetId:string)=>{
        event.preventDefault();
    
        let draggableId = event.dataTransfer?.getData("text/plain").toString();
        let draggableIndex = colorPalette.boxes.findIndex(b=>b.id === draggableId); 
        let targetIndex = colorPalette.boxes.findIndex(b=>b.id === targetId);
  
        let boxes = colorPalette.boxes;
        let removedBoxes = boxes.splice(draggableIndex, 1, boxes[targetIndex]);
        boxes[targetIndex]=removedBoxes[0]
        colorPalette.boxes = [...boxes];
    }
</script>

<div class="color-palette" style="--palette-color:{colorPalette.color}">
    <div class="color-palette-header">
        <div class="palette-name">
            <input type="text" bind:value={colorPalette.name} />
        </div>
        <div class="palette-color">
            <input
                type="color"
                bind:value={colorPalette.color}
                name={colorPalette.color}
            />
        </div>
    </div>
    <div class="palette-color-boxes">
        {#each colorPalette.boxes as colorBox, i}
            <DropTarget id={colorBox.id} ondrop={dropHandler}>
                <ColorBox
                    ondelete={deleteColorBox}
                    bind:colorBox={colorPalette.boxes[i]}
                    draggable={true}
                    {@attach ondragstart}
                ></ColorBox>
            </DropTarget>
        {/each}
        <button class="btn btn-add-box" onclick={addColorBox}
            ><LucideCirclePlus size="2.2rem"></LucideCirclePlus>
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
        border-radius: 20px;
       
        &:hover{
            box-shadow:
                rgba(17, 17, 26, 0.1) 0px 4px 16px,
                rgba(17, 17, 26, 0.1) 0px 8px 24px,
                rgba(17, 17, 26, 0.1) 0px 16px 56px;
            
            box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
       box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
        }
        transition-property: box-shadow, transform;
        transition-duration: 200ms;
        transition-timing-function: ease-in-out;
        .color-palette-header {
            position: relative;
            .palette-name > input {
                background-color: transparent;
                border: transparent;
                font-size: 1.5rem;
                margin: 0;
                padding: 0;
                padding: 0rem 1rem;
                max-width: fit-content;
                width: fit-content;
                field-sizing: content;
                min-width: 100px;
                background-color: #363232a9;
                border-radius: 17px;
                margin: 1rem;
                color: #f5f0f0;
            }
            .palette-color {
                width: 34px;
                height: 34px;
                border-radius: 50%;
                background-color: rgba(253, 255, 255, 0.512);
                border-width: 2px;
                position: absolute;
                right: 20px;
                top: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                input[type="color"] {
                    border: transparent;
                    border-radius: 100%;
                    width: 30px;
                    height: 30px;
                    padding: 0;
                    margin: 0;
                    border-width: 3px;
                    border-color: #1a1a1979;
                    box-shadow: transparent;
                }
                input[type="color"]::-moz-color-swatch {
                    padding: 0;
                    border-width: 3px;
                    border-radius: 50%;
                    border-color: inherit;
                }
                input[type="color"]::-webkit-color-swatch-wrapper {
                    padding: 0;
                    border-radius: 50%;
                    border-width: 3px;
                    border-color: inherit;
                }

                input[type="color"]::-webkit-color-swatch {
                    border-width: 3px;
                    border-radius: 50%;
                    border-color: inherit;
                }
            }
        }

        .palette-color-boxes {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            border-radius: 10px;
            min-height: 130px;
            padding-inline: 1rem;
            padding-block: 1rem;
            row-gap: 1rem;
            column-gap: 0.5rem;
            align-content: center;
            border-radius: 20px;
            transition: all 300ms ease-in-out;
            .btn-add-box {
                box-shadow: none;
                outline: transparent;
                border: transparent;
                width: inherit;
                height: inherit;
                display: flex;
                justify-content: center;
                align-items: center;
                color: hsla(40, 12%, 95%, 0.65);
                background-color: inherit;
                min-height: inherit;
                & :global(svg) {
                    fill: hsla(0, 3%, 12%, 0.65);
                }
            }
        }
    }
</style>
