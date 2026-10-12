# Baby’s Mentor Academy — Live Edition

Node 20+ server with shared host state and auto-updating projector. No npm dependencies.

## Railway setup
Upload these files to the **root** of `githubCoder24/genderRevealApp` on `main`: `index.html`, `game-animations.js`, `server.js`, `package.json`, `Dockerfile`. Railway redeploys automatically.

Set Railway service variable **HOST_PIN** to a long, private secret (at least 8 characters). Do not put the PIN in GitHub. Optional: `DATA_DIR=/data` and mount a Railway persistent volume at `/data` for durable state. Without a volume, Railway restarts or redeploys may lose data.

Links (replace DOMAIN with your Railway domain):
- Guest QR: `https://DOMAIN/#welcome`
- Host: `https://DOMAIN/#host` (PIN required)
- Projector: `https://DOMAIN/#audience` (polls server every 1.5 seconds)

Guests do **not** register on their phones. Host enters their names and checks in / marks paid. Guests see $20 Zelle (845-464-4462) or cash. Payments are manual; the app does not process or verify payments.

## Rehearsal
Open host and projector on **different devices** to test syncing. Export event JSON regularly. The host PIN protects the editing API; do not show the host dashboard on the projector. Use HTTPS.

## Security and operations
Use a unique HOST_PIN. Set Railway volume to `/data` before the event. Avoid using `Load 30 demo guests` or `Reset event` on event day. Do not share the PIN or exported JSON. The public audience API intentionally excludes unrevealed gender and secret clue assignments.
