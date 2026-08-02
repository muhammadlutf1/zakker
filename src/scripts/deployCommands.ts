// import { clientId, guildId, token } from "./config.json";
import { REST, Routes } from "discord.js";
import { config } from "../config";
import commandLoader from "../core/loaders/commandLoader";

const commands = Array.from((await commandLoader()).values()).map((cmd) =>
	cmd.data.toJSON(),
);

const rest = new REST().setToken(process.env.BOT_TOKEN as string);

try {
	console.log(
		`Started refreshing ${commands.length} application (/) commands.`,
	);

	// global commands register
	const data = await rest.put(Routes.applicationCommands(config.clientId), {
		body: commands,
	});

	if (typeof data === "object" && data !== null && "length" in data) {
		console.log(
			`Successfully reloaded ${data.length} application (/) commands.`,
		);
	}
} catch (error) {
	console.error(error);
}
