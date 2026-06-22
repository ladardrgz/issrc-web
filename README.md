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

## Noticias administrables

Las noticias viven como Markdown en `src/content/noticias/` y se administran con Decap CMS desde `/admin/`. El sitio sigue siendo estático: cada publicación aprobada genera un commit/PR en GitHub y Cloudflare Pages vuelve a construirlo.

La instalación, el flujo editorial, OAuth, despliegue y checklist de seguridad están explicados en [docs/decap-cms.md](docs/decap-cms.md).

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
