const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const catalogTemplate = path.resolve(`./src/templates/Catalog.tsx`)
  const expertDetailsTemplate = path.resolve(
    `./src/templates/ExpertDetails.tsx`,
  )

  return new Promise(async (resolve, reject) => {
    const expertsResult = await graphql(`
    {
    allAirtable( filter: { table: { eq: "Operators" } }
        sort: { fields: data___First_Name, order: ASC }) {
          edges {
            node {
              id
              data {
                First_Name
                Headline
                Comments
                Rate
                Calendly_Link
                Photo {
                  url
                }
                Undergraduate_Institution
                Undergraduate_Degrees
                Undergraduate_Graduation_Year
                Undergraduate_Logo {
                  url
                }
                Graduate_Institution
                Graduate_Degrees
                Graduate_Graduation_Year
                Graduate_Logo {
                  url
                }
                Languages
                Location
                Specialties
                Services
                Employer_1_Name
                Employer_1_Title
                Employer_1_Logo {
                  url
                }
                Employer_2_Name
                Employer_2_Title
                Employer_2_Logo {
                  url
                }
              }
            }
          }
        }
      }
    `);

    const servicesResult = await graphql(`
      {
        allAirtable( filter: { table: { eq: "Services" } }
        sort: { fields: data___Name, order: ASC }) {
          edges {
            node {
              id
              data {
                Name
                Emoji
                Description
              }
            }
          }
        }
      }
    `)

    if (expertsResult.error) {
      reject(expertsResult.error)
    }

    if (servicesResult.error) {
      reject(servicesResult.error)
    }

    // Create all experts page.
    createPage({
      path: '/',
      component: catalogTemplate,
      context: {
        experts: expertsResult.data.allAirtable.edges.map(edge => Object.assign({}, edge.node.data, {id: edge.node.id, Services_Text: (edge.node.data.Services && edge.node.data.Services.join(" ")) || ""})),
        services: servicesResult.data.allAirtable.edges.map(edge => Object.assign({}, edge.node.data, {id: edge.node.id}))
      },
    })

    // Create expert pages.
    expertsResult.data.allAirtable.edges.forEach(({ node }) => {
      createPage({
        path: `${node.id}`,
        component: expertDetailsTemplate,
        context: {
          id: node.id,
          firstName: node.data.First_Name,
          headline: node.data.Headline,
          comments: node.data.Comments,
          services: node.data.Services,
          undergradInst: node.data.Undergraduate_Institution,
          undergradDegrees: node.data.Undergraduate_Degrees,
          undergradGradYear: node.data.Undergraduate_Graduation_Year,
          gradInst: node.data.Graduate_Institution,
          gradDegrees: node.data.Graduate_Degrees,
          gradGradYear: node.data.Graduate_Graduation_Year,
          photo: node.data.Photo,
          undergraduateLogo: node.data.Undergraduate_Logo,
          graduateLogo: node.data.Graduate_Logo,
          rate: node.data.Rate,
          calendlyLink: node.data.Calendly_Link,
          employer1: {
            name: node.data.Employer_1_Name,
            logo: node.data.Employer_1_Logo,
            title: node.data.Employer_1_Title,
          },
          employer2: {
            name: node.data.Employer_2_Name,
            logo: node.data.Employer_2_Logo,
            title: node.data.Employer_2_Title,
          },
          languages: node.data.Languages,
          location: node.data.Location,
        },
      })
    })
    resolve()
  })
}
