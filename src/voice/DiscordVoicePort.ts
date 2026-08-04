import {
	AudioPlayerStatus,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
	VoiceConnectionStatus,
	type AudioPlayer,
	type VoiceConnection,
} from "@discordjs/voice";
import type { VoiceChannel } from "discord.js";
import { createLogger } from "../core/logger";
import type {
	AudioPlayerState,
	VoiceConnectionState,
	VoicePort,
	VoicePortEvents,
} from "./VoicePort";

const logger = createLogger("discordVoicePort");

type Payload<K extends keyof VoicePortEvents> = VoicePortEvents[K] extends (
	arg: infer A,
) => void
	? A
	: never;

function toConnectionState(
	status: VoiceConnectionStatus,
): VoiceConnectionState {
	switch (status) {
		case VoiceConnectionStatus.Signalling:
			return "signalling";
		case VoiceConnectionStatus.Connecting:
			return "connecting";
		case VoiceConnectionStatus.Ready:
			return "ready";
		case VoiceConnectionStatus.Disconnected:
			return "disconnected";
		case VoiceConnectionStatus.Destroyed:
			return "destroyed";
	}
}

function toPlayerState(status: AudioPlayerStatus): AudioPlayerState {
	switch (status) {
		case AudioPlayerStatus.Idle:
			return "idle";
		case AudioPlayerStatus.Buffering:
			return "buffering";
		case AudioPlayerStatus.Playing:
			return "playing";
		case AudioPlayerStatus.Paused:
			return "paused";
		case AudioPlayerStatus.AutoPaused:
			return "autoPaused";
	}
}

/**
 * @discordjs/voice adapter. Every 'error' source is attached to a listener
 * before use so nothing crashes the process with an unhandled rejection.
 */
export class DiscordVoicePort implements VoicePort {
	private connection: VoiceConnection | null = null;
	private audioPlayer: AudioPlayer | null = null;

	private readonly listeners: {
		[K in keyof VoicePortEvents]: Set<VoicePortEvents[K]>;
	} = {
		stateChange: new Set(),
		playerStateChange: new Set(),
		error: new Set(),
	};

	async join(channel: VoiceChannel): Promise<void> {
		if (this.connection) {
			this.connection.rejoin({
				channelId: channel.id,
				selfDeaf: true,
				selfMute: false,
			});
			return;
		}

		const connection = joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: channel.guild.voiceAdapterCreator,
			selfDeaf: true,
		});

		this.connection = connection;

		connection.on("stateChange", (_oldState, newState) => {
			const state = toConnectionState(newState.status);

			this.emit("stateChange", state);

			if (state === "disconnected") {
				logger.warn(
					{ guildId: channel.guild.id },
					"Voice connection dropped",
				);
			}
		});

		connection.on("error", (error) => {
			this.emit("error", error);
		});

		const audioPlayer = createAudioPlayer();

		this.audioPlayer = audioPlayer;

		audioPlayer.on("error", (error) => {
			this.emit("error", error);
		});

		audioPlayer.on("stateChange", (_oldState, newState) => {
			this.emit("playerStateChange", toPlayerState(newState.status));
		});

		connection.subscribe(audioPlayer);
	}

	leave(): void {
		this.stop();

		this.connection?.destroy();
		this.connection = null;
		this.audioPlayer = null;
	}

	play(url: string): void {
		if (!this.audioPlayer) return;

		try {
			const resource = createAudioResource(url);

			this.audioPlayer.play(resource);
		} catch (error) {
			this.emit("error", error);
		}
	}

	stop(): void {
		this.audioPlayer?.stop();
	}

	on<K extends keyof VoicePortEvents>(event: K, listener: VoicePortEvents[K]) {
		this.listeners[event].add(listener);
	}

	off<K extends keyof VoicePortEvents>(event: K, listener: VoicePortEvents[K]) {
		this.listeners[event].delete(listener);
	}

	destroy(): void {
		for (const listeners of Object.values(this.listeners)) listeners.clear();
	}

	private emit<K extends keyof VoicePortEvents>(
		event: K,
		payload: Payload<K>,
	) {
		for (const listener of this.listeners[event]) {
			(listener as (payload: Payload<K>) => void)(payload);
		}
	}
}
