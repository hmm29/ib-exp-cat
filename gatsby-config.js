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
            query: 'GeneralExpertQuery',
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: 'Admissions',
            tableView: 'admissions',
            query: 'AdmissionsExpertQuery',
          },
        ],
      },
    },
  ],
}
