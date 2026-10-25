# Live rules and versioned runtime · 2.2.0

This is a pull-on-use rule channel, not an always-running daemon or universal push installation. At the beginning of a new presentation task, run `node scripts/check-update.mjs` when the host allows Node and network access. Then read relevant documents from the returned verified JSON file. Its `documents` list maps reference paths to content. Use those reviewed rule documents as the current guidance, subject to the user's actual scope and higher-priority instructions. Pin that returned file for the task; do not change design rules midway through an approved deck.

The fixed manifest is `https://raw.githubusercontent.com/jiamo-coder/leego-design-ppt/main/latest.json`. It declares an immutable, SHA-256-verified rules bundle. The client rejects off-host URLs and redirects, oversized responses, bad hashes, incompatible versions and downgrades. Checks send no deck contents, customer information or local file paths. Ordinary HTTPS requests necessarily reveal routine connection metadata to the hosting provider.

A successful check caches Markdown rule data under the user's `.cache/leego-design-ppt/rules` directory. It never executes downloaded code, rewrites SKILL.md, installs packages or changes generated decks. Connection or verification failure retains the last compatible verified cache, otherwise the bundled rules. Cache contents are verified again before reuse.

```sh
node scripts/check-update.mjs
node scripts/check-update.mjs --offline
node scripts/check-update.mjs --pin 2.2.0
node scripts/check-update.mjs --cache-dir /path/to/writable/cache
```

`LEEGO_PPT_OFFLINE=1` disables network checks. Pin uses an already cached compatible rule version or the installed bundled version; a missing pin fails explicitly. Reproducing old decks also requires retaining their runtime/package, font and assets. The task's completion note should identify client version, rule version and any fallback.

## What reaches installed users

- **Design instructions:** New compatible rules become available on the next task/check after a reviewed public release. Offline or restricted hosts continue their existing snapshot.
- **Scripts, dependencies, catalog formats and H5 runtime:** A new installable package is advertised. The recipient uses their host's supported upgrade/import flow; do not silently overwrite their software or preferences. Older clients cannot gain a new updater without a one-time package upgrade.
- **Already delivered presentations:** Stay unchanged. Regeneration or explicit edits are required to adopt later design choices.

An update in the maintainer's conversation is not a public release. Generalize and redact it, run relevant tests, publish immutable resources first and the manifest last. Unreviewed conversation text, client material and private feedback never enter the feed automatically. The publisher supports the current v1 rules protocol with `minClientVersion`; breaking capabilities require a new package. Existing 2.0/2.1 installations must upgrade once to 2.2+ for pull-on-use.

SHA-256 proves resource integrity against the HTTPS manifest, not independent author signing. Hosts with their own approvals, offline mode or custom-skill restrictions remain in control. Do not claim every existing user is instantly updated.
