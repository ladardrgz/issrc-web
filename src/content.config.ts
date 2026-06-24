import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const CLOUDINARY_CLOUD_NAME = 'dw9odd2n1';

const optionalAsset = (folder: 'images' | 'documents', extensions: string[]) =>
  z.preprocess(
    (value) => (value === '' ? undefined : value),
    z
      .string()
      .regex(
        new RegExp(
          `^(?:/uploads/${folder}/[^?#]+|https://res\\.cloudinary\\.com/${CLOUDINARY_CLOUD_NAME}/(?:image|raw)/upload/[^?#]+)\\.(${extensions.join('|')})(?:[?#].*)?$`,
          'i',
        ),
        `El archivo debe estar en Cloudinary (${CLOUDINARY_CLOUD_NAME}) o, por compatibilidad histórica, dentro de /uploads/${folder}/. Revisá que la extensión sea: ${extensions.join(', ')}.`,
      )
      .optional(),
  );

const optionalPdf = () =>
  z.preprocess(
    (value) => (value === '' ? undefined : value),
    z
      .string()
      .regex(
        new RegExp(
          [
            '^(',
            '/uploads/documents/[^?#]+\\.pdf',
            `|https://res\\.cloudinary\\.com/${CLOUDINARY_CLOUD_NAME}/(?:image|raw)/upload/[^?#]+\\.pdf`,
            '|https://drive\\.google\\.com/(?:file/d/[A-Za-z0-9_-]+(?:/(?:view|preview))?|open\\?id=[A-Za-z0-9_-]+|uc\\?(?:export=download&)?id=[A-Za-z0-9_-]+)(?:[?&][^\\s]*)?',
            ')$',
          ].join(''),
          'i',
        ),
        'El PDF debe ser un enlace público de Google Drive o, por compatibilidad histórica, un PDF ya publicado en Cloudinary o /uploads/documents/.',
      )
      .optional(),
  );

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: z.object({
    title: z.string().trim().min(5).max(120),
    slug: z
      .string()
      .trim()
      .min(3)
      .max(100)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Usá minúsculas, números y guiones.'),
    date: z.coerce.date(),
    category: z.enum(['Institucional', 'Comunicado', 'Académica', 'Actividades']),
    summary: z.preprocess(
      (value) => (value === '' ? undefined : value),
      z.string().trim().max(280).optional(),
    ),
    featuredImage: optionalAsset('images', ['avif', 'gif', 'jpeg', 'jpg', 'png', 'webp']),
    pdf: optionalPdf(),
    status: z.enum(['draft', 'published']).default('draft'),
  }),
});

export const collections = { noticias };
