// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content'

// 2. Import loader(s)
import { glob } from 'astro/loaders'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Get the directory of this config file and resolve to projects folder
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 3. Define your collection(s)
const projects = defineCollection({
  loader: glob({ 
    pattern: '**/*.mdx', 
    base: join(__dirname, 'content', 'projects')
  }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    minutes: z.number().optional(),
    company: z.string().optional(),
    featuredImage: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
  }),
})

// 4. Export a single `collections` object to register you collection(s)
export const collections = { projects }
