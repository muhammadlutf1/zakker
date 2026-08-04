# Structured logging with pino

The skeleton logged nothing except a few ad-hoc `console.log`/`console.error` calls, and new subsystems (voice, players) need a logging convention before Milestone 2. We adopt **pino** as the logging library, exposed through a `createLogger(name)` factory in `src/core/logger.ts` that returns a single shared logger carrying a `module` binding.

Log level comes from the `LOG_LEVEL` env var. In development (`NODE_ENV !== "production"`, the default) the level defaults to `debug` and output is pretty-printed via pino-pretty; in production it defaults to `info` with plain JSON output. All `console.*` calls are replaced — new subsystems must use the factory, never `console` — and per-module context comes from the factory's `name` argument, not from re-instantiating loggers.

Winston was the main alternative considered; pino was chosen for its smaller footprint and structured-by-default output. A plain single shared instance was considered instead of a factory, but module context in every log line is worth the small ceremony.
