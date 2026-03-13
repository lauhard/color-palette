ALTER TABLE `palette` RENAME COLUMN "colors" TO "color_boxes";--> statement-breakpoint
ALTER TABLE `palette` ADD `color` text NOT NULL;