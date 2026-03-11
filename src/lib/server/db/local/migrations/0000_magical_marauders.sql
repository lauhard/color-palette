CREATE TABLE `palette` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`colors` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL
);
