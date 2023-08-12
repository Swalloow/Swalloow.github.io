let contentfulConfig

try {
  contentfulConfig = require('./.contentful')
} catch (e) {
  contentfulConfig = {
    production: {
      spaceId: process.env.SPACE_ID,
      accessToken: process.env.ACCESS_TOKEN,
    },
  }
} finally {
  const { spaceId, accessToken } = contentfulConfig.production
  if (!spaceId || !accessToken) {
    throw new Error('Contentful space ID and access token need to be provided.')
  }
}

module.exports = {
  siteMetadata: {
    siteUrl: 'https://swalloow.github.io',
    title: 'Swalloow Blog',
    description: 'Personal Blog. About Data Science, Data Engineering',
    image: '/images/share.jpg',
    rssMetadata: {
      site_url: 'https://swalloow.github.io',
      feed_url: `https://swalloow.github.io/feed.xml`,
      title: 'Swalloow Blog',
      description: 'Personal Blog. About Data Science, Data Engineering',
      image_url: `/images/share.jpg`,
    },
    menuLinks: [
      {
        name: 'Home',
        slug: '/',
      },
      {
        name: 'About',
        slug: '/about/',
      },
    ],
    postsPerFirstPage: 7,
    postsPerPage: 6,
    basePath: '/',
  },
  plugins: [
    `gatsby-plugin-emotion`,
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // https://github.com/KaTeX/KaTeX/blob/master/docs/options.md
              strict: 'ignore',
            },
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 650,
              backgroundColor: 'white',
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: 'gatsby-source-contentful',
      options:
        process.env.NODE_ENV === 'development'
          ? contentfulConfig.development
          : contentfulConfig.production,
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS,
        head: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Noto+Sans+KR\:300,400,500,700`
        ],
        display: 'swap'
      }
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'GCN',
        short_name: 'GCN',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: './static/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://swalloow.github.io',
        sitemap: 'https://swalloow.github.io/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-schema-snapshot`,
      options: {
        path: `./src/gatsby/schema/schema.gql`,
        update: process.env.GATSBY_UPDATE_SCHEMA_SNAPSHOT,
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata
          ret.allMarkdownRemark = ref.query.allMarkdownRemark
          ret.generator = 'GatsbyJS GCN Starter'
          return ret
        },
        query: `
          {
            site {
              siteMetadata {
                rssMetadata {
                  site_url
                  feed_url
                  title
                  description
                  image_url
                }
              }
            }
          }
        `,
        feeds: [
          {
            serialize(ctx) {
              const rssMetadata = ctx.query.site.siteMetadata.rssMetadata
              return ctx.query.allContentfulPost.edges.map((edge) => ({
                date: edge.node.publishDate,
                title: edge.node.title,
                description: edge.node.body.childMarkdownRemark.excerpt,

                url: rssMetadata.site_url + '/' + edge.node.slug,
                guid: rssMetadata.site_url + '/' + edge.node.slug,
              }))
            },
            query: `
            {
              allContentfulPost(limit: 100, sort: {fields: [publishDate], order: DESC}) {
                edges {
                  node {
                    title
                    slug
                    publishDate(formatString: "MMMM DD, YYYY")
                    body {
                      childMarkdownRemark {
                        html
                        excerpt(pruneLength: 80)
                      }
                    }
                  }
                }
              }
            }
            `,
            output: '/feed.xml',
          },
        ],
      },
    },
  ],
}
