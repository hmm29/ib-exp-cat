/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5, // default, limited to 5 requests per second per base
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: 'Operators',
            tableView: 'confirmed',
            queryName: 'Experts',
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: 'Services',
            tableView: 'published',
            queryName: 'Services',
          }
          // {
          //   baseId: process.env.AIRTABLE_BASE_ID,
          //   tableName: 'Admissions',
          //   tableView: 'admissions',
          //   query: 'AdmissionsExpertQuery',
          // },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        // [required] - path to your createStore module
        pathToCreateStoreModule: './src/state/createStore',
        // [optional] - options passed to `serialize-javascript`
        // info: https://github.com/yahoo/serialize-javascript#options
        // will be merged with these defaults:
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
        },
        // [optional] - if true will clean up after itself on the client, default:
        cleanupOnClient: true,
        // [optional] - name of key on `window` where serialized state will be stored, default:
        windowKey: '__PRELOADED_STATE__',
      },
    },
  ],
}
