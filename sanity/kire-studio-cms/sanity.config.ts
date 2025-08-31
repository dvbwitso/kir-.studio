import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'KIRE Studio CMS',

  projectId: '3klw8jzl',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Products')
              .child(
                S.documentTypeList('product')
                  .title('Products')
                  .menuItems([
                    S.menuItem()
                      .title('Create New Product')
                      .intent({type: 'create', params: {type: 'product'}})
                  ])
              ),
            S.listItem()
              .title('Services')
              .child(
                S.documentTypeList('service')
                  .title('Services')
                  .menuItems([
                    S.menuItem()
                      .title('Create New Service')
                      .intent({type: 'create', params: {type: 'service'}})
                  ])
              ),
            // Add other content types
            ...S.documentTypeListItems().filter(
              (listItem) => !['product', 'service'].includes(listItem.getId()!)
            ),
          ])
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },

  cors: {
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      'https://kire-studio.vercel.app'
    ]
  },

  // Enable document actions including delete
  document: {
    actions: (prev, context) => {
      // Enable all default actions including delete
      return prev
    }
  }
})
