CREATE TABLE `inscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`prenom` varchar(255) NOT NULL,
	`nom` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`telephone` varchar(20) NOT NULL,
	`accepteContact` int NOT NULL DEFAULT 0,
	`attestePresence` int NOT NULL DEFAULT 0,
	`eventId` varchar(64) NOT NULL DEFAULT 'prochain-event',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inscriptions_id` PRIMARY KEY(`id`)
);
