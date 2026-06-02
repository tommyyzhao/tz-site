# tz-site

Personal website for Thomas Zhao — a single static page built with Next.js
(App Router) and Tailwind CSS, deployed to GitHub Pages at
[tz.surreal.so](https://tz.surreal.so).

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Build

```bash
pnpm build        # static export to ./out  (next.config.js sets output: 'export')
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
static export and publishes it to GitHub Pages. The custom domain is configured
via `public/CNAME`.
