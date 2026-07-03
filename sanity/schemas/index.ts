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

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery Reel',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'image',      title: 'Image',       type: 'image', options: { hotspot: true } }),
            defineField({ name: 'title',      title: 'Title',       type: 'string' }),
            defineField({ name: 'subtitle',   title: 'Subtitle',    type: 'string' }),
            defineField({ name: 'collection', title: 'Collection',  type: 'string' }),
            defineField({ name: 'year',       title: 'Year',        type: 'string' }),
            defineField({ name: 'desc',       title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'title', media: 'image' } },
        },
      ],
    }),
  ],
});

export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({ name: 'name',     title: 'Collection Name', type: 'string' }),
    defineField({ name: 'slug',     title: 'Slug',            type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'tagline',  title: 'Tagline',         type: 'string' }),
    defineField({ name: 'desc',     title: 'Description',     type: 'text', rows: 2 }),
    defineField({ name: 'coverImage', title: 'Cover Image',   type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'thumbs',
      title: 'Thumbnail Images (2)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (R) => R.max(2),
    }),
    defineField({ name: 'order', title: 'Display Order (1, 2, 3…)', type: 'number' }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
