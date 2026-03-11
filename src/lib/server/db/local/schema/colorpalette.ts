import { sql } from "drizzle-orm/sql";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const colorpalette = sqliteTable("palette", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    colors: text("colors").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
        .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});