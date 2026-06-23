# Cloudinary para medios del sitio

Esta guía deja preparada la integración futura de Cloudinary para imágenes y documentos públicos usados por Decap CMS.

## Qué guarda cada sistema

- GitHub guarda el contenido editorial en Markdown dentro de `src/content/noticias/`.
- Cloudinary guarda y entrega imágenes y PDF públicos desde su CDN.
- `public/uploads/` queda como compatibilidad para archivos locales ya publicados, no como destino recomendado para cargas masivas nuevas.

## Configuración actual

La configuración vive en `public/admin/config.yml`:

```yaml
media_library:
  name: cloudinary
  config:
    cloud_name: dw9odd2n1
    api_key: "483949511648638"
    output_filename_only: false
    use_secure_url: true
    multiple: false
```

`cloud_name` y `api_key` son públicos y pueden estar en el repositorio. El `api_secret` nunca debe subirse a GitHub, pegarse en Decap, exponerse con prefijo `PUBLIC_` ni usarse en el navegador.

## Flujo recomendado para noticias

1. Entrar a `/admin/`.
2. Crear o editar una noticia.
3. En “Imagen destacada”, seleccionar o subir la imagen desde Cloudinary.
4. En “Documento PDF”, seleccionar un PDF público desde Cloudinary si corresponde.
5. Guardar como borrador.
6. Revisar el preview o el deploy de rama.
7. Publicar solo después de confirmar que imagen y PDF abren correctamente.

Decap guarda en el Markdown una URL segura de Cloudinary, por ejemplo:

```yaml
featuredImage: https://res.cloudinary.com/dw9odd2n1/image/upload/...
pdf: https://res.cloudinary.com/dw9odd2n1/raw/upload/...
```

Astro valida esas URLs en `src/content.config.ts` antes de compilar.

## Reglas de seguridad

- No subir documentos privados: todo recurso enlazado desde el sitio debe considerarse público.
- No subir credenciales, DNI, historiales médicos, datos de estudiantes ni documentación sensible.
- Revisar derechos de uso de imágenes antes de publicar.
- Mantener los PDF con nombres claros, sin espacios raros y con tamaño razonable.
- Si Cloudinary bloquea un PDF, revisar en Cloudinary la configuración de entrega de archivos PDF/raw.
- La institución debe ser dueña de la cuenta Cloudinary antes del lanzamiento definitivo.

## Carreras y secciones futuras

Para imágenes de carreras u otras secciones estáticas, se puede usar una URL segura de Cloudinary en los archivos de datos cuando la institución ya tenga organizado su repositorio multimedia.

Ejemplo:

```ts
image: 'https://res.cloudinary.com/dw9odd2n1/image/upload/v0000000000/carreras/enfermeria.webp'
```

También se puede seguir usando una ruta local pública:

```ts
image: '/images/institution/portada-iss.png'
```

La opción recomendada para muchas imágenes es Cloudinary, porque evita agrandar el repositorio y entrega recursos desde CDN.
