# Medios del sitio: Cloudinary + Google Drive

Esta guía define dónde se guardan los recursos públicos vinculados desde noticias y comunicados.

## Qué guarda cada sistema

- GitHub guarda el contenido editorial en Markdown dentro de `src/content/noticias/`.
- Cloudinary guarda y entrega imágenes públicas desde su CDN.
- Google Drive guarda y comparte documentos PDF públicos.
- `public/uploads/` queda solo como compatibilidad para archivos locales ya publicados.

## Flujo recomendado para noticias

### Imagen destacada

1. Entrar a Cloudinary: `https://console.cloudinary.com/`.
2. Subir la imagen.
3. Copiar la URL segura de entrega.
4. Pegarla en Decap en “URL de imagen destacada en Cloudinary”.

Ejemplo válido:

```yaml
featuredImage: https://res.cloudinary.com/dw9odd2n1/image/upload/v0000000000/noticias/inscripciones.webp
```

La URL debe empezar con:

```txt
https://res.cloudinary.com/dw9odd2n1/image/upload/
```

Y terminar en `.avif`, `.gif`, `.jpg`, `.jpeg`, `.png` o `.webp`.

### Documento PDF

1. Subir el PDF a Google Drive.
2. Abrir “Compartir”.
3. Cambiar el acceso a “Cualquier persona con el enlace puede ver”.
4. Copiar el enlace.
5. Pegarlo en Decap en “Enlace público del PDF en Google Drive”.

Ejemplo válido:

```yaml
pdf: https://drive.google.com/file/d/ID_DEL_ARCHIVO/view?usp=sharing
```

No pegar enlaces de carpetas privadas ni enlaces que solo funcionen con tu sesión.

## Reglas de seguridad

- Todo recurso enlazado desde el sitio debe considerarse público.
- No subir credenciales, DNI, historiales médicos, datos de estudiantes ni documentación sensible.
- Revisar derechos de uso de imágenes antes de publicar.
- Mantener imágenes optimizadas y PDF con tamaño razonable.
- No guardar `api_secret` de Cloudinary en GitHub, Decap, Astro ni variables públicas.
- No publicar PDFs privados en Drive. Si el enlace se comparte en una noticia, cualquier visitante podría abrirlo.
- La institución debe ser dueña de las cuentas de Cloudinary y Google Drive antes del lanzamiento definitivo.

## Validaciones del sitio

Decap valida:

- imágenes solo desde `https://res.cloudinary.com/dw9odd2n1/image/upload/`;
- PDF solo desde enlaces públicos de `https://drive.google.com/`.

Astro vuelve a validar el frontmatter en `src/content.config.ts` durante el build. Si alguien edita Markdown manualmente y pega una URL incorrecta, el build debe fallar antes de publicar.
