# Astro + Decap CMS

## Arquitectura

Decap CMS es una interfaz web sobre Git: no almacena contenidos por su cuenta. Al publicar crea cambios Markdown en GitHub. Cloudflare Pages detecta el cambio en `main`, ejecuta `npm run build` y sirve únicamente archivos estáticos. No se necesita VPS, base de datos ni backend de contenidos.

La única pieza de autenticación es OAuth: GitHub no permite guardar el `client_secret` en el navegador. Las Pages Functions en `functions/api/` realizan ese intercambio y conservan el secreto como variable cifrada de Cloudflare.

```text
persona editora -> /admin/ -> OAuth -> GitHub (flujo editorial)
                                      -> revisión -> main
                                                   -> Cloudflare Pages -> sitio estático
```

## Medios

- Imágenes: Cloudinary.
- Documentos PDF: Google Drive con enlace público.
- Contenido editorial: Markdown en `src/content/noticias/`.

El panel no abre Cloudinary ni Google Drive embebidos. La persona editora sube el recurso en la plataforma correspondiente y pega la URL pública en Decap.

## Archivos y responsabilidades

- `public/admin/index.html`: carga una versión fijada de Decap CMS; no contiene secretos.
- `public/admin/admin.css` y `public/admin/admin-ui.js`: mejoran la presentación inicial del panel sin modificar la autenticación real.
- `public/admin/config.yml`: conecta Decap con GitHub, activa el flujo editorial y define los campos editoriales.
- `functions/api/auth.js`: inicia OAuth, crea el estado CSRF y una cookie segura.
- `functions/api/callback.js`: valida el estado e intercambia el código por un token sin exponer el secreto.
- `public/_headers`: cabeceras de seguridad reconocidas por Cloudflare Pages.
- `src/content.config.ts`: valida frontmatter, estado, slug y URLs antes de compilar.
- `src/content/noticias/`: fuente Markdown versionada de cada noticia.
- `src/lib/remarkRemoveHtml.mjs`: elimina HTML crudo antes de renderizar.
- `src/components/NoticiaCard.astro`: tarjeta tolerante a resumen o imagen ausentes.
- `src/pages/noticias/index.astro`: listado de entradas con `status: published`.
- `src/pages/noticias/[slug].astro`: genera una página estática por publicación.

## Campos

| Campo | Requerido | Regla |
| --- | --- | --- |
| `title` | sí | 5–120 caracteres |
| `slug` | sí | minúsculas, números y guiones; forma la URL |
| `date` | sí | fecha ISO `YYYY-MM-DD` |
| `category` | sí | opción de la lista controlada |
| `summary` | no | máximo 280 caracteres |
| `featuredImage` | no | URL segura de Cloudinary: `https://res.cloudinary.com/dw9odd2n1/image/upload/...` |
| `pdf` | no | enlace público de Google Drive: `https://drive.google.com/file/d/.../view?...` |
| `status` | sí | `draft` o `published`; el sitio ignora borradores |
| cuerpo Markdown | sí | HTML crudo eliminado antes del render |

Decap valida los campos para orientar a la persona editora. Astro vuelve a validar en `src/content.config.ts` durante el build; si alguien edita el Markdown a mano y pega una URL inválida, la compilación debe fallar.

## Flujo de medios

### Imagen

1. Subir imagen a Cloudinary.
2. Copiar URL de entrega de `res.cloudinary.com`.
3. Pegarla en “URL de imagen destacada en Cloudinary”.

### PDF

1. Subir PDF a Google Drive.
2. Compartirlo como “Cualquier persona con el enlace puede ver”.
3. Copiar el enlace.
4. Pegar el enlace en “Enlace público del PDF en Google Drive”.

No publicar documentos con datos personales o información sensible. Un PDF enlazado desde el sitio debe tratarse como público.

## Desarrollo local

```sh
npm install
npm run dev
```

Para probar el panel localmente, en otra terminal:

```sh
npx decap-server
```

Luego abrir `http://localhost:4321/admin/`. `local_backend: true` conecta el panel con el proxy local sin OAuth. Usarlo solo en la computadora de desarrollo.

Pruebas mínimas antes de enviar cambios:

```sh
npm run build
npm run preview
```

## OAuth de GitHub en producción

1. Crear una GitHub OAuth App desde una cuenta/organización institucional. Homepage: `https://issrc-web.ladardrgz.workers.dev/`; callback exacta: `https://issrc-web.ladardrgz.workers.dev/api/callback`.
2. En Cloudflare Pages, agregar `GITHUB_CLIENT_ID` como variable y `GITHUB_CLIENT_SECRET` como secreto cifrado.
3. No usar prefijo `PUBLIC_`, no pegar los valores en `config.yml` y no subirlos a Git.
4. El alcance predeterminado es `public_repo`, suficiente para este repositorio público. Solo si pasa a privado, crear conscientemente `GITHUB_OAUTH_SCOPE=repo`.
5. Volver a desplegar después de crear o modificar variables.

Decap no convierte `/admin/` en privado: cualquiera puede cargar su HTML, pero solamente GitHub + OAuth + permisos del repositorio deben permitir operar.

## GitHub y flujo de publicación

En el repositorio, proteger `main`:

1. Requerir pull request antes del merge.
2. Requerir al menos una aprobación de una persona distinta de quien edita.
3. Descartar aprobaciones cuando haya nuevos commits.
4. Requerir que `npm run build` pase como status check.
5. Bloquear force pushes y borrado de `main`.
6. Restringir quién puede hacer push/merge; no conceder rol Admin a editores de contenido.
7. Activar 2FA en la organización y revisar colaboradores periódicamente.

## Checklist de seguridad

- [ ] OAuth desplegado con secretos cifrados y permisos mínimos.
- [ ] Ningún token, client secret, `api_secret` de Cloudinary o `.env` versionado.
- [ ] `main` protegida, sin pushes directos y con build obligatorio.
- [ ] Aprobación humana obligatoria antes del merge/publicación.
- [ ] Colaboradores mínimos, cuentas individuales y 2FA.
- [ ] Imágenes públicas servidas desde Cloudinary.
- [ ] PDF públicos servidos desde Google Drive con acceso “Cualquier persona con el enlace puede ver”.
- [ ] No publicar datos personales, documentación sensible ni PDFs privados.
- [ ] Build rechazando slugs, estados, URLs o extensiones inválidas; HTML crudo eliminado.
- [ ] Dependencia CDN de Decap fijada y actualizada deliberadamente.

## Errores frecuentes

- **Una noticia no aparece:** sigue en `draft`, no se completó **Publish**, el PR no llegó a `main` o el build falló.
- **Decap rechaza una URL de imagen:** debe empezar con `https://res.cloudinary.com/dw9odd2n1/image/upload/` y terminar en AVIF, GIF, JPG, JPEG, PNG o WebP.
- **Decap rechaza una URL de PDF:** debe ser un enlace de `https://drive.google.com/file/d/.../view?...` o un formato equivalente de Drive.
- **El PDF pide login:** en Google Drive falta cambiar acceso a “Cualquier persona con el enlace puede ver”.
- **El slug cambió y aparece un 404:** el slug es la URL permanente. No modificarlo después de publicar sin agregar una redirección.
- **Se publicó un PDF privado por error:** retirar el enlace no basta; hay que tratarlo como incidente.
