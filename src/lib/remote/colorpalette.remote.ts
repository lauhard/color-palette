import * as z from "zod";
import { error, redirect } from '@sveltejs/kit';
import { query, form, command, getRequestEvent } from '$app/server';
import { ColorPaletteRepository } from "$lib/server/api/colorpalette/ColorPaletteRepository";

const paletteSchema = z.object({
    name: z.string(),
    color: z.string(),
    colorBoxes: z.array(z.object({
        id: z.string(),
        color: z.string(),
        name: z.string(),
        variableName: z.string()
    }))
});

export const savePalette = command(paletteSchema, async (data) => {
    const event = getRequestEvent();

    //init colorpaletteRepository
    const colorpaletteRepo = new ColorPaletteRepository(event.platform);
    const res = await colorpaletteRepo.createColorPalette({
        name: data.name,
        color: data.color,
        colorBoxes: data.colorBoxes,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    console.log("Saved palette:", res);
    return res;
});

export const updatePalette = command(paletteSchema.extend({ id: z.string() }), async (data) => {
    const event = getRequestEvent();

    //init colorpaletteRepository
    const colorpaletteRepo = new ColorPaletteRepository(event.platform);
    const res = await colorpaletteRepo.update(data.id, {
        name: data.name,
        color: data.color,
        colorBoxes: data.colorBoxes,
        updatedAt: new Date()
    });
    console.log("Updated palette:", res);
    return res;
});

export const getPalettes = query(async () => {
    const event = getRequestEvent();

    //init colorpaletteRepository
    const colorpaletteRepo = new ColorPaletteRepository(event.platform);
    const res = await colorpaletteRepo.findAll();
    console.log("Fetched palettes:", res);
    return res;
});

export const getPaletteById = query(z.string(), async (id) => {
    const event = getRequestEvent();

    //init colorpaletteRepository
    const colorpaletteRepo = new ColorPaletteRepository(event.platform);
    const res = await colorpaletteRepo.findById(id);
    console.log("Fetched palette by ID:", res);
    if (!res) {
        throw error(404, "Palette not found");
    }
    return res;
});

export const deletePalette = command(z.string(), async (id) => {
    const event = getRequestEvent();

    //init colorpaletteRepository
    const colorpaletteRepo = new ColorPaletteRepository(event.platform);
    await colorpaletteRepo.delete(id);
    console.log("Deleted palette with ID:", id);
    return { success: true };
});