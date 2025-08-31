import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Import your document schemas
import service from './service'
import product from './product'
import heroSection from './heroSection'
import aboutSection from './aboutSection'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // Document types
    service,
    product,
    heroSection,
    aboutSection,
  ]),
})
