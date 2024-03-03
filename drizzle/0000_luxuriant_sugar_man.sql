CREATE TABLE IF NOT EXISTS `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user` integer NOT NULL,
	`last` integer NOT NULL,
	`type` text NOT NULL,
	`desc` text NOT NULL,
	`time` text DEFAULT (strftime ('%Y-%m-%dT%H:%M:%fZ')),
	`val` integer NOT NULL,
	`bal` integer DEFAULT null CHECK (
          CASE
            WHEN user = 1 THEN bal > -100001
            WHEN user = 2 THEN bal > -80001
            WHEN user = 3 THEN bal > -1000001
            WHEN user = 4 THEN bal > -10000001
            WHEN user = 5 THEN bal > -500001
            ELSE NULL
          END
        ) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `user_idx` ON `transactions` (`user`);--> statement-breakpoint
CREATE UNIQUE INDEX `check` ON `transactions` (`user`,`last`);