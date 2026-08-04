# In-memory queue, not Redis

The guild Queue was initially proposed as a Redis-backed store to support future scaling and sharding (and for learning). We rejected Redis: Discord sharding assigns each guild to exactly one process, and a voice connection can only live in the process that created it, so a guild's Player and its Queue must be colocated — a shared Redis queue would only let other processes read/modify a guild's queue while the owning process alone can play it. The Queue is therefore an in-memory structure owned by the Player.

## Considered Options

- **Redis-backed queue** — chosen for scaling/sharding and learning purposes. Rejected because sharding does not require a shared queue, and it adds serialization and ops cost with no benefit at this scale. Redis can be introduced later behind the Queue boundary if a concrete need appears (external dashboard, pre-fetch worker, restart recovery).

## Consequences

- Queue state does not survive a process restart — acceptable, because durable recovery was deferred in favor of crash-proofing: unhandled voice-stream errors (not restarts) are the real cause of voice-bot downtime.
