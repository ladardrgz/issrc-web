# ISRC Web

Sitio institucional desarrollado con Astro puro y CSS, sin frameworks de interfaz ni base de datos.

## Desarrollo

```sh
npm install
npm run dev
```

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/             # Recursos estáticos
├── src/components/     # Header, Navbar, Hero y Footer
├── src/content/blog/   # Publicaciones Markdown
├── src/data/           # Información compartida
├── src/layouts/        # Layout principal
├── src/pages/          # Rutas del sitio
├── src/styles/         # Estilos globales
└── package.json
```

## Blog

Cada archivo `.md` de `src/content/blog/` genera una página. Sus campos requeridos están definidos en `src/content.config.ts`.

## Comandos

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
