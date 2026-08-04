import type { VoiceChannel } from "discord.js";

export type VoiceConnectionState =
	| "signalling"
	| "connecting"
	| "ready"
	| "disconnected"
	| "destroyed";

export type AudioPlayerState =
	| "idle"
	| "buffering"
	| "playing"
	| "paused"
	| "autoPaused";

export interface VoicePortEvents {
	stateChange: (state: VoiceConnectionState) => void;
	playerStateChange: (state: AudioPlayerState) => void;
	error: (error: unknown) => void;
}

/**
 * Isolates @discordjs/voice behind a small injected interface so the Player
 * never touches the voice library directly.
 */
export interface VoicePort {
	join(channel: VoiceChannel): Promise<void>;
	leave(): void;
	play(url: string): void;
	stop(): void;
	on<K extends keyof VoicePortEvents>(
		event: K,
		listener: VoicePortEvents[K],
	): void;
	off<K extends keyof VoicePortEvents>(
		event: K,
		listener: VoicePortEvents[K],
	): void;
	destroy(): void;
}
