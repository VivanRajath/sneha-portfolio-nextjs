import { defineField, defineType } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Site Title', type: 'string' }),
    defineField({
      name: 'heroImages',
      title: 'Hero Carousel Images',
      description: 'Upload 3–6 images — they will auto-slide left and right in the hero',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'aboutMainImage',
      title: 'About — Main Portrait',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'aboutAccentImage',
      title: 'About — Accent Portrait',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'aboutBio',
      title: 'About Bio',
      type: 'text',
      rows: 4,
      description: 'Short bio shown in the About section',
    }),
  ],
});

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'document',
  description: 'Each section = one full-screen hero image + 3 auto-scrolling image rows below it. Add as many sections as you want.',
  fields: [
    defineField({ name: 'title',      title: 'Title',            type: 'string', description: 'e.g. H O P' }),
    defineField({ name: 'collection', title: 'Collection Label', type: 'string', description: 'e.g. Street Couture' }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      description: 'Full-screen image shown at the top of this section',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images (3 rows)',
      description: 'Upload 9+ images — auto-split into 3 rows, each scrolling at a different speed',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'order', title: 'Display Order (1, 2, 3…)', type: 'number' }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
