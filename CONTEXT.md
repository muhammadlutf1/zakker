# Zakker Bot

A Discord bot that registers slash commands and event handlers at startup, then dispatches incoming interactions to the registered commands.

## Language

**Bot**:
The Discord client instance that owns the loaded commands and events and manages the client lifecycle (login, ready).
_Avoid_: Client, client instance

**Command**:
A slash command the bot exposes, with a definition (name and options) and an `execute(bot, interaction)` behavior.
_Avoid_: SlashCommand, command handler

**BotEvent**:
A registered Discord event handler with a name, an optional `once` flag, and an `execute(bot, ...args)` behavior.
_Avoid_: Event handler, handler, listener

**Loader**:
The mechanism that reads files from the `commands/` and `events/` directories and registers each valid one into the Bot's collections.
_Avoid_: importer, registrar

**Dispatcher**:
The BotEvent that routes an incoming interaction to the matching Command and handles command execution errors.
_Avoid_: handler, router
