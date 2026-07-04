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

export const portfolioSettings = defineType({
  name: 'portfolioSettings',
  title: 'Portfolio — Hero & Closing',
  type: 'document',
  description: 'The hero banner and closing quote of the /portfolio page.',
  fields: [
    defineField({ name: 'heroImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroKicker', title: 'Hero Kicker', type: 'string', description: 'e.g. The Portfolio' }),
    defineField({ name: 'heroTitle', title: 'Hero Title (line 1)', type: 'string', description: 'e.g. Every image' }),
    defineField({ name: 'heroTitleEm', title: 'Hero Title (italic line 2)', type: 'string', description: 'e.g. is a sentence.' }),
    defineField({ name: 'heroSub', title: 'Hero Sub-line', type: 'string', description: 'e.g. Scroll to read the story.' }),
    defineField({ name: 'frameCount', title: 'Frame Count label', type: 'string', description: 'e.g. 32 Frames' }),
    defineField({ name: 'chapterCount', title: 'Chapter Count label', type: 'string', description: 'e.g. 3 Chapters' }),
    defineField({ name: 'closingQuote', title: 'Closing Quote (line 1)', type: 'string' }),
    defineField({ name: 'closingQuoteEm', title: 'Closing Quote (italic line 2)', type: 'string' }),
    defineField({ name: 'closingAuthor', title: 'Closing Author', type: 'string', description: 'e.g. — Sneha, Creative Director' }),
  ],
});

export const portfolioChapter = defineType({
  name: 'portfolioChapter',
  title: 'Portfolio Chapter',
  type: 'document',
  description: 'One chapter of the /portfolio story — an optional full-bleed opener, a book spread, and a grid of frames.',
  fields: [
    defineField({ name: 'roman', title: 'Roman Numeral', type: 'string', description: 'e.g. I, II, III' }),
    defineField({ name: 'name', title: 'Chapter Name', type: 'string', description: 'e.g. Phool' }),
    defineField({ name: 'sub', title: 'Chapter Subtitle', type: 'string', description: 'e.g. Heritage Couture · Bengaluru Flower Market' }),
    defineField({ name: 'order', title: 'Display Order (1, 2, 3…)', type: 'number' }),

    // Optional full-bleed opener
    defineField({ name: 'fullImage', title: 'Full-bleed Opener Image (optional)', type: 'image', options: { hotspot: true }, description: 'Leave empty to skip the full-screen opener' }),
    defineField({ name: 'fullFrame', title: 'Full — Frame label', type: 'string', description: 'e.g. Frame 006' }),
    defineField({ name: 'fullTitle', title: 'Full — Title', type: 'string' }),
    defineField({ name: 'fullTitleEm', title: 'Full — Title (italic part)', type: 'string' }),
    defineField({ name: 'fullBody', title: 'Full — Body', type: 'text', rows: 2 }),

    // Book spread (text page + image page)
    defineField({ name: 'bookNum', title: 'Book — Page Number', type: 'string', description: 'e.g. 01' }),
    defineField({ name: 'bookLabel', title: 'Book — Chapter Label', type: 'string' }),
    defineField({ name: 'bookTitle', title: 'Book — Title (line 1)', type: 'string' }),
    defineField({ name: 'bookTitleEm', title: 'Book — Title (italic line 2)', type: 'string' }),
    defineField({ name: 'bookBody', title: 'Book — Body', type: 'text', rows: 4 }),
    defineField({ name: 'bookCollection', title: 'Book — Collection line', type: 'string' }),
    defineField({ name: 'bookImage', title: 'Book — Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bookCaption', title: 'Book — Image Caption', type: 'string' }),

    // Grid
    defineField({ name: 'gridLabel', title: 'Grid Label', type: 'string', description: 'e.g. Selected Frames — Phool' }),
    defineField({
      name: 'grid',
      title: 'Grid Frames',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'num', title: 'Frame Number', type: 'string', description: 'e.g. 002' },
          { name: 'story', title: 'Caption / Story', type: 'string' },
          { name: 'tall', title: 'Tall (portrait) frame?', type: 'boolean' },
        ],
        preview: { select: { title: 'story', subtitle: 'num', media: 'image' } },
      }],
    }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
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
