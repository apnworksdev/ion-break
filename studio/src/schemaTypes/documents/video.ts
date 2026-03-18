import { defineType, defineField, ALL_FIELDS_GROUP } from 'sanity'
export default defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  groups: [
    {
      ...ALL_FIELDS_GROUP,
      hidden: true,
    },
    {
      name: 'shortClip',
      title: 'Short Clip'
    },
    {
      name: 'fullVideo',
      title: 'Full Video'
    }
  ],
  fields: [
    defineField({
      name: 'posterImageShortClip',
      title: 'Poster Image',
      type: 'image',
      group: 'shortClip',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'shortClipFile',
      title: 'Clip',
      type: 'file',
      group: 'shortClip',
      options: {
        accept: 'video/*',
      }
    }),
    defineField({
      name: 'shortClipUrl',
      title: 'Clip (CDN)',
      type: 'url',
      group: 'shortClip',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'posterImageFullVideo',
      title: 'Poster Image',
      type: 'image',
      group: 'fullVideo',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'fullVideoFile',
      title: 'Video',
      type: 'file',
      group: 'fullVideo',
      options: {
        accept: 'video/*',
      }
    }),
    defineField({
      name: 'fullVideoUrl',
      title: 'Video (CDN)',
      type: 'url',
      group: 'fullVideo',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Video'
    })
  }
})
