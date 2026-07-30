import fs from "node:fs";
import path from "node:path";
import { Collection } from "discord.js";
import type Command from "../Command";

/**
 * reads and builds commands collection dynamically from commands folder
 */
export default async function commandLoader() {
	const collection = new Collection<string, Command>();

	const foldersPath = path.join(import.meta.dirname, "..", "..", "commands");
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);

		const commandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => file.endsWith(".ts"));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);

			// try {
			// 	const CommandClass = await import(filePath);
			//
			//	// TODO: Implement type guard
			//
			// } catch (error) {
			// 	console.log(
			// 		`[ERROR] Failed to import command at ${filePath}: ${error}`,
			// 	);
			// }
		}
	}

	return collection;
}
