const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const catalogTemplate = path.resolve(`./src/templates/Catalog.tsx`)
  const expertDetailsTemplate = path.resolve(
    `./src/templates/ExpertDetails.tsx`,
  )

  return new Promise(async (resolve, reject) => {
    const result = await graphql(`
      {
        allAirtable {
          edges {
            node {
              id
              data {
                First_Name
                Last_Name
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
                Comments
                Location
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
    `)

    if (result.error) {
      reject(result.error)
    }

    // Create all Experts page
    createPage({
      path: '/',
      component: catalogTemplate,
      context: {
        experts: result.data.allAirtable.edges.map(edge => edge.node.data),
      },
    })

    // Create expert pages.
    result.data.allAirtable.edges.forEach(({ node }) => {
      createPage({
        path: `${node.data.First_Name.trim()}`,
        component: expertDetailsTemplate,
        context: {
          id: node.id,
          firstName: node.data.First_Name,
          lastName: node.data.Last_Name,
          undergradInst: node.data.Undergraduate_Institution,
          undergradDegrees: node.data.Undergraduate_Degrees,
          undergradGradYear: node.data.Undergraduate_Graduation_Year,
          gradInst: node.data.Graduate_Institution,
          gradDegrees: node.data.Graduate_Degrees,
          gradGradYear: node.data.Graduate_Graduation_Year,
          photo: node.data.Photo,
          undergraduateLogo: node.data.Undergraduate_Logo,
          graduateLogo: node.data.Graduate_Logo,
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
          comments: node.data.Comments,
          location: node.data.Location,
        },
      })
    })
    resolve()
  })
}