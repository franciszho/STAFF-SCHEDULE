# Staff Scheduler Pro

Netlify settings are included in `netlify.toml`.

Expected repository root:
- `netlify.toml`
- `package.json`
- `public/index.html`
- `netlify/functions/schedule.mjs`
- `scripts/build.mjs`

Netlify build command: `npm run build`
Netlify publish directory: `dist`
Netlify functions directory: `netlify/functions`

If Netlify UI has old settings, set Base directory to blank, Build command to `npm run build`, and Publish directory to `dist`, then deploy with cache cleared.
