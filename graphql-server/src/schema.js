const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Category {
        id: Int!
        name: String!
        description: String!
        articles: [Article!]!
      }

    type Article {
        id: Int!
        title: String!
        summary: String!
        content: String!
        author: String!
        category: Category!
    }

    type Image {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type Query {
        allCategory: [Category!]!
        categoryById(id: Int!): Category
        allArticle: [Article!]!
        articleById(id: Int!): Article
        articlesByCategoryId(categoryId: Int!): [Article!]!
        allImage: [Image]
    }

    type Mutation {
        createCategory(name: String!, description: String!): Category!
        createArticle(
          categoryId: Int!
          title: String!
          summary: String!
          content: String!
          author: String!
        ): Article!
        uploadImage(image: Upload!): Image!
    }
`

module.exports = typeDefs