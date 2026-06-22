# Astro + Decap CMS

## Arquitectura

Decap CMS es una interfaz web sobre Git: no almacena contenidos por su cuenta. Al publicar crea cambios Markdown y archivos multimedia en GitHub. Cloudflare Pages detecta el cambio en `main`, ejecuta `npm run build` y sirve únicamente archivos estáticos. No se necesita VPS, base de datos ni backend de contenidos.

La única pieza de autenticación es OAuth: GitHub no permite guardar el `client_secret` en el navegador. En producción, `/admin/` debe apuntar a un proveedor OAuth serverless (por ejemplo, un Worker de Cloudflare auditado) que conserve ese secreto como variable cifrada. El Worker autentica; no almacena noticias ni procesa la web pública.

```text
persona editora -> /admin/ -> OAuth -> GitHub (rama editorial/PR)
                                      -> revisión -> main
                                                   -> Cloudflare Pages -> sitio estático
```

Documentación oficial de referencia:

- [Agregar Decap CMS a un sitio](https://decapcms.org/docs/add-to-your-site/)
- [Backend de GitHub y autenticación](https://decapcms.org/docs/github-backend/)
- [Flujo editorial](https://decapcms.org/docs/editorial-workflows/)
- [Content collections de Astro](https://docs.astro.build/en/guides/content-collections/)
- [Desplegar Astro en Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)

## Archivos y responsabilidades

- `public/admin/index.html`: carga una versión fijada de Decap CMS; no contiene secretos.
- `public/admin/config.yml`: conecta Decap con GitHub, activa el flujo editorial y define los campos y carpetas de subida.
- `public/uploads/images/`: imágenes públicas. Que sea pública es intencional; nunca guardar documentos privados aquí.
- `public/uploads/documents/`: PDF públicos vinculados desde noticias.
- `public/_headers`: cabeceras de seguridad reconocidas por Cloudflare Pages y política más estricta para `/admin/`.
- `src/content.config.ts`: valida frontmatter, estado, slug y rutas/extensiones antes de compilar.
- `src/content/noticias/`: fuente Markdown versionada de cada noticia.
- `src/lib/remarkRemoveHtml.mjs`: elimina HTML crudo antes de renderizar para que nunca se ejecute.
- `src/components/NoticiaCard.astro`: tarjeta tolerante a resumen o imagen ausentes.
- `src/pages/noticias/index.astro`: listado de entradas con `status: published`.
- `src/pages/noticias/[slug].astro`: genera una página estática por publicación; el PDF es opcional.
- `src/pages/rss.xml.ts` y `src/pages/sitemap.xml.ts`: incluyen únicamente entradas publicadas.

El componente anterior `NewsCard.astro` se conservó para no borrar archivos existentes, pero ya no se importa. La entrada de ejemplo se migró de `src/content/blog/` a `src/content/noticias/` manteniendo su contenido.

## Campos

| Campo | Requerido | Regla |
| --- | --- | --- |
| `title` | sí | 5–120 caracteres |
| `slug` | sí | minúsculas, números y guiones; forma la URL |
| `date` | sí | fecha ISO `YYYY-MM-DD` |
| `category` | sí | opción de la lista controlada |
| `summary` | no | máximo 280 caracteres |
| `featuredImage` | no | ruta en `/uploads/images/` y extensión permitida |
| `pdf` | no | ruta en `/uploads/documents/` y extensión `.pdf` |
| `status` | sí | `draft` o `published`; el sitio ignora borradores |
| cuerpo Markdown | sí | HTML crudo eliminado antes del render |

Las restricciones del selector ayudan a la persona editora; el esquema de Astro es la segunda barrera y hace fallar el build ante frontmatter inválido. GitHub sigue siendo la frontera de confianza: una persona con escritura directa podría eludir el formulario, por eso son imprescindibles las reglas de rama y la revisión.

## Desarrollo local

Requisitos: Node.js 22.12 o superior y dependencias instaladas.

```sh
npm install
npm run dev
```

El sitio queda en `http://localhost:4321`. Para probar también el panel, en otra terminal ejecutar:

```sh
npx decap-server
```

Luego abrir `http://localhost:4321/admin/`. `local_backend: true` conecta el panel con el proxy local sin OAuth. Usarlo solo en la computadora de desarrollo y no exponer el puerto del proxy a Internet.

Pruebas mínimas antes de enviar cambios:

```sh
npm run build
npm run preview
```

Revisar `/`, `/noticias/`, `/noticias/bienvenida/`, `/rss.xml`, `/sitemap.xml` y `/admin/`. Crear además un borrador local: no debe aparecer en el sitio generado.

## OAuth de GitHub en producción

1. Elegir un proveedor OAuth para Decap compatible con GitHub y Cloudflare Workers, revisar su código y fijar una versión.
2. Crear una GitHub OAuth App desde una cuenta/organización institucional, no personal. La callback debe coincidir exactamente con la del proveedor.
3. Guardar `CLIENT_ID` y `CLIENT_SECRET` como secretos cifrados del Worker. Nunca usar `PUBLIC_*`, archivos `.env` versionados ni `config.yml` para el secreto.
4. Dar al Worker un dominio estable, idealmente `cms-auth.issformosa.edu.ar`.
5. Descomentar `base_url` y `auth_endpoint` en `public/admin/config.yml`.
6. Si se usa un dominio propio en vez de `*.workers.dev`, agregar ese origen a `connect-src` en `public/_headers`.
7. Probar login, creación de borrador, revisión y publicación con una cuenta editora de prueba.

No desplegar el panel productivo con un proxy local ni colocar un Personal Access Token en JavaScript. Decap no convierte `/admin/` en privado: cualquiera puede cargar su HTML, pero solamente GitHub + OAuth + permisos del repositorio deben permitir operar. `noindex` evita indexación, no sustituye autenticación.

## GitHub y flujo de publicación

En el repositorio, proteger `main`:

1. Requerir pull request antes del merge.
2. Requerir al menos una aprobación de una persona distinta de quien edita.
3. Descartar aprobaciones cuando haya nuevos commits.
4. Requerir que `npm run build` pase como status check.
5. Bloquear force pushes y borrado de `main`.
6. Restringir quién puede hacer push/merge; no conceder rol Admin a editores de contenido.
7. Activar 2FA en la organización y revisar colaboradores periódicamente.
8. Usar `CODEOWNERS` si existe un equipo institucional estable, por ejemplo para exigir revisión en `src/content/noticias/` y `public/uploads/`.

`publish_mode: editorial_workflow` crea ramas/solicitudes editoriales y estados de borrador, revisión y listo. El campo `status` agrega defensa en profundidad: una entrada solo se genera si vale `published`. Antes de pulsar **Publish**, la persona revisora debe comprobar título, fecha, enlaces, ortografía, derechos de imagen, que el PDF sea público y no contenga datos personales, y que el estado sea `published`.

Cloudflare debe desplegar producción únicamente desde `main`. Los previews de ramas son útiles para revisión, pero sus URLs deben tratarse como potencialmente públicas: no subir contenido confidencial ni siquiera como borrador.

## Cloudflare Pages

1. En Cloudflare, crear un proyecto Pages y conectar `ladardrgz/issrc-web` de GitHub.
2. Framework preset: **Astro**.
3. Production branch: `main`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Configurar una versión Node compatible con `package.json` (22.12 o superior).
7. No agregar tokens GitHub al build de Pages: la integración GitHub App de Cloudflare es suficiente para desplegar.
8. Asociar el dominio, confirmar HTTPS y revisar las cabeceras de `/admin/`.

## Checklist de seguridad

- [ ] OAuth desplegado con secretos cifrados y permisos mínimos.
- [ ] Ningún token, client secret o `.env` versionado.
- [ ] `main` protegida, sin pushes directos y con build obligatorio.
- [ ] Aprobación humana obligatoria antes del merge/publicación.
- [ ] Colaboradores mínimos, cuentas individuales y 2FA.
- [ ] Solo archivos públicos y sin datos sensibles en `public/uploads/`.
- [ ] Imágenes optimizadas y PDF revisados; establecer un límite de tamaño en la revisión (por ejemplo, 5 MB por archivo).
- [ ] Build rechazando slugs, estados, rutas o extensiones inválidos; HTML crudo eliminado.
- [ ] Dependencia CDN de Decap fijada y actualizada deliberadamente.
- [ ] Dependabot/GitHub security alerts activados y auditoría periódica de OAuth Apps.
- [ ] Previews de Cloudflare considerados públicos.

## Errores frecuentes

- **El login vuelve a fallar:** `base_url`, callback de la OAuth App y dominio real no coinciden, o CSP no permite el dominio OAuth.
- **Una noticia no aparece:** sigue en `draft`, no se completó **Publish**, el PR no llegó a `main` o el build falló.
- **El build rechaza un archivo:** está en una carpeta incorrecta, tiene extensión no permitida o el frontmatter no cumple el esquema.
- **El slug cambió y aparece un 404:** el slug es la URL permanente. No modificarlo después de publicar sin agregar una redirección.
- **Una subida termina en la carpeta equivocada:** comprobar los `media_folder` del campo y no mover el archivo manualmente sin actualizar el Markdown.
- **El panel local no conecta:** falta `npx decap-server`, se abrió otro puerto o el proxy se ejecutó fuera de la raíz del repositorio.
- **El panel abre pero producción no autentica:** `local_backend` no proporciona autenticación productiva; falta configurar OAuth.
- **Se subió un PDF privado por error:** todo lo que está en `public/` y en Git es público y conserva historial. Retirar el enlace no basta; hay que revocar/rotar los datos expuestos y limpiar el historial mediante un procedimiento de incidente.
