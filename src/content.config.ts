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
    pdf: optionalAsset('documents', ['pdf']),
    status: z.enum(['draft', 'published']).default('draft'),
  }),
});

export const collections = { noticias };
