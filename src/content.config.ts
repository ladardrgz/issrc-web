import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const optionalUpload = (folder: 'images' | 'documents', extensions: string[]) =>
  z.preprocess(
    (value) => (value === '' ? undefined : value),
    z
      .string()
      .regex(
        new RegExp(`^/uploads/${folder}/[^?#]+\\.(${extensions.join('|')})$`, 'i'),
        `El archivo debe estar dentro de /uploads/${folder}/ y tener un formato permitido.`,
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
    featuredImage: optionalUpload('images', ['avif', 'gif', 'jpeg', 'jpg', 'png', 'webp']),
    pdf: optionalUpload('documents', ['pdf']),
    status: z.enum(['draft', 'published']).default('draft'),
  }),
});

export const collections = { noticias };
