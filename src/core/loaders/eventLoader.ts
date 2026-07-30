import fs from "node:fs";
import path from "node:path";
import { Collection } from "discord.js";
import type BotEvent from "../Event";

/**
 * reads and builds events collection dynamically from events folder
 */
export default async function commandLoader() {
	const collection = new Collection<string, BotEvent>();

	const foldersPath = path.join(import.meta.dirname, "..", "..", "events");
	const eventFolders = fs.readdirSync(foldersPath);

	for (const folder of eventFolders) {
		const eventsPath = path.join(foldersPath, folder);

		const eventFiles = fs
			.readdirSync(eventsPath)
			.filter((file) => file.endsWith(".ts"));

		for (const file of eventFiles) {
			const filePath = path.join(eventsPath, file);

			// try {
			// 	const CommandClass = await import(filePath);

			// 	// TODO: Implement type guard

			// } catch (error) {
			// 	console.log(
			// 		`[ERROR] Failed to import command at ${filePath}: ${error}`,
			// 	);
			// }
		}
	}

	return collection;
}
