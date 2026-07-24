# Staff Scheduler Live

This Netlify project publishes directly from the `public` folder. It has no build script and no framework requirement.

Repository root must contain:

- `netlify.toml`
- `package.json`
- `public/index.html`
- `netlify/functions/schedule.mjs`

Netlify settings:

- Base directory: blank
- Build command: blank
- Publish directory: `public`
- Functions directory: `netlify/functions`

After deployment test:

`https://YOUR-SITE.netlify.app/.netlify/functions/schedule`
