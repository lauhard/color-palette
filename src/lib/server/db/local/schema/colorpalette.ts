import { sql } from "drizzle-orm/sql";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export type ColorBoxEntity = { id: string; color: string; name:string; variableName:string; };

export const colorpalette = sqliteTable("palette", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    color: text("color").notNull(),
    colorBoxes: text("color_boxes", { mode: "json" }).$type<ColorBoxEntity[]>().notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
        .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export type ColorPaletteEntity = typeof colorpalette.$inferSelect;
export type NewColorPaletteEntity = typeof colorpalette.$inferInsert;