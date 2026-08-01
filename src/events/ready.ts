import { ActivityType, Events } from "discord.js";
import type { BotEvent } from "../core/Event";

const readyEvent: BotEvent<Events.ClientReady> = {
	name: Events.ClientReady,
	once: true,
	execute(_, client) {
		console.log(`Logged in as ${client.user.tag}`);

		client.user.setPresence({
			activities: [
				{
					name: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
					type: ActivityType.Playing,
				},
			],
			status: "online",
		});
	},
} as const;

export default readyEvent;
