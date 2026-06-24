# Astro + Decap CMS

## Arquitectura

Decap CMS es una interfaz web sobre Git: no almacena contenidos por su cuenta. Al publicar crea cambios Markdown en GitHub. Cloudflare Pages detecta el cambio en `main`, ejecuta `npm run build` y sirve únicamente archivos estáticos. No se necesita VPS, base de datos ni backend de contenidos.

La única pieza de autenticación es OAuth: GitHub no permite guardar el `client_secret` en el navegador. Las Pages Functions en `functions/api/` realizan ese intercambio y conservan el secreto como variable cifrada de Cloudflare. Autentican; no almacenan noticias ni procesan la web pública.

```text
persona editora -> /admin/ -> OAuth -> GitHub (flujo editorial)
                                      -> revisión -> main
                                                   -> Cloudflare Pages -> sitio estático
```

## Archivos y responsabilidades

- `public/admin/index.html`: carga una versión fijada de Decap CMS; no contiene secretos.
- `public/admin/admin.css` y `public/admin/admin-ui.js`: mejoran la presentación inicial del panel sin modificar la autenticación real.
- `public/admin/config.yml`: conecta Decap con GitHub, activa el flujo editorial y define los campos editoriales.
- `functions/api/auth.js`: inicia OAuth, crea el estado CSRF y una cookie segura de diez minutos.
- `functions/api/callback.js`: valida el estado e intercambia el código por un token sin exponer el secreto.
- `public/_headers`: cabeceras de seguridad reconocidas por Cloudflare Pages y política más estricta para `/admin/`.
- `src/content.config.ts`: valida frontmatter, estado, slug y URLs/extensiones antes de compilar.
- `src/content/noticias/`: fuente Markdown versionada de cada noticia.
- `src/lib/remarkRemoveHtml.mjs`: elimina HTML crudo antes de renderizar para que nunca se ejecute.
- `src/components/NoticiaCard.astro`: tarjeta tolerante a resumen o imagen ausentes.
- `src/pages/noticias/index.astro`: listado de entradas con `status: published`.
- `src/pages/noticias/[slug].astro`: genera una página estática por publicación; el PDF es opcional.

## Campos

| Campo | Requerido | Regla |
| --- | --- | --- |
| `title` | sí | 5–120 caracteres |
| `slug` | sí | minúsculas, números y guiones; forma la URL |
| `date` | sí | fecha ISO `YYYY-MM-DD` |
| `category` | sí | opción de la lista controlada |
| `summary` | no | máximo 280 caracteres |
| `featuredImage` | no | URL segura de Cloudinary: `https://res.cloudinary.com/dw9odd2n1/image/upload/...` |
| `pdf` | no | URL segura de Cloudinary: `https://res.cloudinary.com/dw9odd2n1/raw/upload/...pdf` |
| `status` | sí | `draft` o `published`; el sitio ignora borradores |
| cuerpo Markdown | sí | HTML crudo eliminado antes del render |

Decap valida los campos para orientar a la persona editora. Astro vuelve a validar en `src/content.config.ts` durante el build; si alguien edita el Markdown a mano y pega una URL inválida, la compilación debe fallar.

## Cloudinary

El panel ya no usa el selector embebido de Cloudinary. Ese selector depende de iframes, cookies de terceros y sesión activa dentro del navegador; en Brave, Edge o navegadores con protección de rastreo puede fallar con “cloudinary.com rechazó la conexión”.

Flujo recomendado:

1. Abrir `https://console.cloudinary.com/` en una pestaña normal.
2. Subir imagen o PDF a la cuenta institucional.
3. Copiar la URL segura que empieza con `https://res.cloudinary.com/dw9odd2n1/`.
4. Pegar esa URL en Decap.

Nunca guardar `api_secret` de Cloudinary en el repositorio, en Decap ni en variables públicas. El sitio solo necesita URLs públicas de recursos ya publicados.

## Desarrollo local

```sh
npm install
npm run dev
```

Para probar el panel localmente, en otra terminal:

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

Las funciones serverless están en `functions/api/auth.js` y `functions/api/callback.js`. Cloudflare Pages las publica como `/api/auth` y `/api/callback`; no almacenan contenido ni requieren base de datos.

1. Crear una GitHub OAuth App desde una cuenta/organización institucional. Homepage: `https://issrc-web.ladardrgz.workers.dev/`; callback exacta: `https://issrc-web.ladardrgz.workers.dev/api/callback`.
2. En Cloudflare Pages, agregar `GITHUB_CLIENT_ID` como variable y `GITHUB_CLIENT_SECRET` como secreto cifrado, solo para Production.
3. No usar prefijo `PUBLIC_`, no pegar los valores en `config.yml` y no subirlos a Git.
4. El alcance predeterminado es `public_repo`, suficiente para este repositorio público. Solo si pasa a privado, crear conscientemente `GITHUB_OAUTH_SCOPE=repo`.
5. Volver a desplegar después de crear o modificar variables.
6. Probar login, creación de borrador, revisión y publicación con una cuenta editora de prueba.

Decap no convierte `/admin/` en privado: cualquiera puede cargar su HTML, pero solamente GitHub + OAuth + permisos del repositorio deben permitir operar. `noindex` evita indexación, no sustituye autenticación.

## GitHub y flujo de publicación

En el repositorio, proteger `main`:

1. Requerir pull request antes del merge.
2. Requerir al menos una aprobación de una persona distinta de quien edita.
3. Descartar aprobaciones cuando haya nuevos commits.
4. Requerir que `npm run build` pase como status check.
5. Bloquear force pushes y borrado de `main`.
6. Restringir quién puede hacer push/merge; no conceder rol Admin a editores de contenido.
7. Activar 2FA en la organización y revisar colaboradores periódicamente.
8. Usar `CODEOWNERS` si existe un equipo institucional estable.

`publish_mode: editorial_workflow` crea ramas/solicitudes editoriales y estados de borrador, revisión y listo. El campo `status` agrega defensa en profundidad: una entrada solo se genera si vale `published`.

## CSP del panel

La política de `/admin/*` permite solo lo necesario para:

- Decap desde `unpkg.com`;
- GitHub OAuth/API;
- el dominio del sitio;
- previsualización de imágenes públicas desde `res.cloudinary.com`.

Cloudinary no se abre en iframe. Esto reduce superficie de ataque y evita depender de cookies de terceros.

## Checklist de seguridad

- [ ] OAuth desplegado con secretos cifrados y permisos mínimos.
- [ ] Ningún token, client secret, `api_secret` de Cloudinary o `.env` versionado.
- [ ] `main` protegida, sin pushes directos y con build obligatorio.
- [ ] Aprobación humana obligatoria antes del merge/publicación.
- [ ] Colaboradores mínimos, cuentas individuales y 2FA.
- [ ] Imágenes y PDF públicos servidos desde Cloudinary con URLs `https://res.cloudinary.com/dw9odd2n1/...`.
- [ ] No publicar datos personales, documentación sensible ni PDFs privados.
- [ ] Imágenes optimizadas y PDF revisados; establecer un límite de tamaño en la revisión.
- [ ] Build rechazando slugs, estados, URLs o extensiones inválidas; HTML crudo eliminado.
- [ ] Dependencia CDN de Decap fijada y actualizada deliberadamente.
- [ ] Dependabot/GitHub security alerts activados y auditoría periódica de OAuth Apps.
- [ ] Previews de Cloudflare considerados públicos.

## Errores frecuentes

- **El login vuelve a fallar:** `base_url`, callback de la OAuth App y dominio real no coinciden, o faltan variables OAuth en Cloudflare.
- **Una noticia no aparece:** sigue en `draft`, no se completó **Publish**, el PR no llegó a `main` o el build falló.
- **Decap rechaza una URL de imagen:** debe empezar con `https://res.cloudinary.com/dw9odd2n1/image/upload/` y terminar en AVIF, GIF, JPG, JPEG, PNG o WebP.
- **Decap rechaza una URL de PDF:** debe empezar con `https://res.cloudinary.com/dw9odd2n1/raw/upload/` o `/image/upload/` y terminar en `.pdf`.
- **Cloudinary dice “rechazó la conexión”:** no usar iframe ni selector embebido. Abrir Cloudinary en una pestaña normal, subir el recurso, copiar la URL segura y pegarla en Decap.
- **El slug cambió y aparece un 404:** el slug es la URL permanente. No modificarlo después de publicar sin agregar una redirección.
- **El panel local no conecta:** falta `npx decap-server`, se abrió otro puerto o el proxy se ejecutó fuera de la raíz del repositorio.
- **Se publicó un PDF privado por error:** retirar el enlace no basta; hay que revocar/rotar los datos expuestos y tratarlo como incidente.
