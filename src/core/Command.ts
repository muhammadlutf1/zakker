import type {
	Client,
	CommandInteraction,
	SlashCommandBuilder,
} from "discord.js";

export default interface Command {
	readonly data: SlashCommandBuilder;
	execute(
		client: Client,
		interaction: CommandInteraction,
	): Promise<void> | void;
}
