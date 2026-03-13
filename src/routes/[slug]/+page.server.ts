import { getPaletteById } from "$lib/remote/colorpalette.remote";
import type { ColorPaletteEntity } from "$lib/server/db/local/schema";
import type { PageServerLoad } from "./$types";

export const load:PageServerLoad = async ({ params }) => {
    const { slug } = params;
    let id = slug;
    const res = await getPaletteById(id);
    return {
        palette: res as ColorPaletteEntity
    }
}