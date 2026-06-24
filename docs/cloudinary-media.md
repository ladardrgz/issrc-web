# Cloudinary para medios del sitio

Esta guía define el uso de Cloudinary como CDN para imágenes y documentos públicos usados por las noticias del sitio.

## Qué guarda cada sistema

- GitHub guarda el contenido editorial en Markdown dentro de `src/content/noticias/`.
- Cloudinary guarda y entrega imágenes y PDF públicos desde su CDN.
- `public/uploads/` queda solo como compatibilidad para archivos locales ya publicados, no como destino recomendado para cargas masivas nuevas.

## Flujo recomendado para noticias

1. Entrar a Cloudinary en una pestaña normal: `https://console.cloudinary.com/`.
2. Subir la imagen o PDF a la cuenta institucional.
3. Copiar la URL segura del recurso. Debe empezar con `https://res.cloudinary.com/dw9odd2n1/`.
4. Entrar al panel del sitio en `/admin/`.
5. Crear o editar una noticia.
6. Pegar la URL en “URL de imagen destacada en Cloudinary” o “URL de documento PDF en Cloudinary”.
7. Guardar como borrador.
8. Revisar la publicación antes de marcarla como publicada.

Ejemplos válidos:

```yaml
featuredImage: https://res.cloudinary.com/dw9odd2n1/image/upload/v0000000000/noticias/inscripciones.webp
pdf: https://res.cloudinary.com/dw9odd2n1/raw/upload/v0000000000/documentos/reglamento.pdf
```

## Por qué no usamos el selector embebido de Cloudinary

El selector embebido depende de iframes, cookies de terceros y sesión activa de Cloudinary dentro del panel Decap. En navegadores modernos puede fallar con mensajes como:

- `cloudinary.com rechazó la conexión`
- `requestStorageAccess: Permission denied`
- `401 Unauthorized` en `console.cloudinary.com`

Para un sitio institucional administrado por varias personas, el flujo de copiar URL segura es más estable, más fácil de documentar y evita que el soporte dependa de Brave Shields, Edge Tracking Prevention, cookies de terceros o extensiones del navegador.

## Reglas de seguridad

- No subir documentos privados: todo recurso enlazado desde el sitio debe considerarse público.
- No subir credenciales, DNI, historiales médicos, datos de estudiantes ni documentación sensible.
- Revisar derechos de uso de imágenes antes de publicar.
- Usar nombres claros y carpetas organizadas en Cloudinary, por ejemplo `noticias/` y `documentos/`.
- Mantener imágenes optimizadas y PDF con tamaño razonable.
- No guardar `api_secret` de Cloudinary en GitHub, Decap, Astro ni variables públicas.
- Si Cloudinary bloquea un PDF, revisar la configuración de entrega de archivos PDF/raw en la cuenta.
- La institución debe ser dueña de la cuenta Cloudinary antes del lanzamiento definitivo.

## Validaciones del sitio

Decap valida que las URLs pegadas pertenezcan a `res.cloudinary.com/dw9odd2n1` y tengan extensiones permitidas.

Astro vuelve a validar el frontmatter en `src/content.config.ts` durante el build. Si alguien edita Markdown manualmente y pega una URL incorrecta, el build debe fallar antes de publicar.

## Carreras y secciones futuras

Para imágenes de carreras u otras secciones estáticas, también se puede usar una URL segura de Cloudinary en los archivos de datos cuando la institución ya tenga organizado su repositorio multimedia.

Ejemplo:

```ts
image: 'https://res.cloudinary.com/dw9odd2n1/image/upload/v0000000000/carreras/enfermeria.webp'
```

También se puede seguir usando una ruta local pública:

```ts
image: '/images/institution/portada-iss.png'
```

La opción recomendada para muchas imágenes es Cloudinary, porque evita agrandar el repositorio y entrega recursos desde CDN.
