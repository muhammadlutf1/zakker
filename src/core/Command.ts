import type { CommandInteraction, SlashCommandBuilder } from "discord.js";
import type Bot from "./Bot";

export interface Command {
	readonly data: SlashCommandBuilder;
	execute(bot: Bot, interaction: CommandInteraction): Promise<void> | void;
}

export function isCommand(command: unknown): command is Command {
	return (
		typeof command === "object" &&
		command !== null &&
		"data" in command &&
		"execute" in command
	);
}
