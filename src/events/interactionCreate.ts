import { Events, MessageFlags } from "discord.js";
import type { BotEvent } from "../core/Event";

const interactionDispatcher: BotEvent<Events.InteractionCreate> = {
	name: Events.InteractionCreate,
	async execute(bot, interaction) {
		// Slash commands
		if (interaction.isChatInputCommand()) {
			const command = bot.commands.get(interaction.commandName);

			if (!command) return;

			try {
				await command.execute(bot, interaction);
			} catch (error) {
				console.error(error);

				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({
						content: "There was an error while executing this command!",
						flags: MessageFlags.Ephemeral,
					});
				} else {
					await interaction.reply({
						content: "There was an error while executing this command!",
						flags: MessageFlags.Ephemeral,
					});
				}
			}
		}
	},
} as const;

export default interactionDispatcher;
