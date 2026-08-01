import type {
	Client,
	CommandInteraction,
	SlashCommandBuilder,
} from "discord.js";

export interface Command {
	readonly data: SlashCommandBuilder;
	execute(
		client: Client,
		interaction: CommandInteraction,
	): Promise<void> | void;
}

export function isCommand(command: unknown): command is Command {
	return (
		typeof command === "object" &&
		command !== null &&
		"data" in command &&
		"execute" in command
	);
}
