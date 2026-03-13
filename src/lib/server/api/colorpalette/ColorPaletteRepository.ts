import { BaseRepository } from "../BaseRepository";
import type { Platform } from "../../../../app";
// // TODO: Import your actual schema
import { like } from "drizzle-orm/sql";
import { colorpalette, type ColorBoxEntity } from "$lib/server/db/local/schema";

// // Placeholder types - replace with your actual schema types
type ColorPalette = { id: string; name: string; color: string; colorBoxes: ColorBoxEntity[]; createdAt: Date; updatedAt: Date };
type NewColorPalette = Omit<ColorPalette, "id">;

// /**
//  * Repository for managing color palettes.
//  */
export class ColorPaletteRepository extends BaseRepository<
    typeof colorpalette,
    NewColorPalette,
    ColorPalette
> {
    // Define the table and ID column for the base class
    protected table = colorpalette;
    protected idColumn = colorpalette.id;
    constructor(platform: Platform) {
        super(platform);
    }

    //create a new color palette - use create method from BaseRepository
    async createColorPalette(data: NewColorPalette): Promise<ColorPalette> {
        return this.create(data);
    }


    async findByName(name: string): Promise<ColorPalette[]> {
       return this.execute("findByName", async () => {
           const results = await this.db
               .select()
               .from(this.table)
               .where(like(this.table.name, `%${name}%`));
           
           return results
           ////if colors are string array, split them into array
           //.map(row => ({
           //    ...row,
           //    colors: typeof row.colors === 'string' ? row.colors.split(',') : row.colors
           //}));
       });
    }
}


