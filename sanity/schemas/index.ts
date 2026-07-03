import { defineField, defineType } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Site Title', type: 'string' }),
    defineField({ name: 'heroImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'aboutImage', title: 'About Section Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'aboutBio', title: 'About Bio (short)', type: 'text', rows: 3 }),
  ],
});

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery Reel',
  type: 'document',
  fields: [
    defineField({
      name: 'heroRevealImage',
      title: 'Hero Reveal Image (B&W push)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images (3 columns)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'showMoreImages',
      title: 'Show More Images (hidden initially)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
});

export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Collection Name', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'tagline', title: 'Tagline (1 line)', type: 'string' }),
    defineField({ name: 'description', title: 'Description (optional, short)', type: 'text', rows: 2 }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'images',
      title: 'Collection Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
