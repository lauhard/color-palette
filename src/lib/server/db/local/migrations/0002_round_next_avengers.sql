PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_palette` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`colors` text NOT NULL,
	`test` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_palette`("id", "name", "colors", "test", "created_at", "updated_at") SELECT "id", "name", "colors", "test", "created_at", "updated_at" FROM `palette`;--> statement-breakpoint
DROP TABLE `palette`;--> statement-breakpoint
ALTER TABLE `__new_palette` RENAME TO `palette`;--> statement-breakpoint
PRAGMA foreign_keys=ON;