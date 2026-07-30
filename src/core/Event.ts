import type { Client, ClientEvents } from "discord.js";

export default interface BotEvent<
	T extends keyof ClientEvents = keyof ClientEvents,
> {
	readonly name: T;
	readonly once?: boolean;
	execute(client: Client, ...args: ClientEvents[T]): Promise<void> | void;
}
