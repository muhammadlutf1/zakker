import type { Client, ClientEvents } from "discord.js";

export interface BotEvent<T extends keyof ClientEvents = keyof ClientEvents> {
	readonly name: T;
	readonly once?: boolean;
	execute(client: Client, ...args: ClientEvents[T]): Promise<void> | void;
}

export function isBotEvent(event: unknown): event is BotEvent {
	return (
		typeof event === "object" &&
		event !== null &&
		"name" in event &&
		"execute" in event
	);
}
