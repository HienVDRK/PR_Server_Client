const resolvers = {
    Query: {
        async allCategory (root, args, { models }) {
            return models.Category.findAll()
        },
        async categoryById (root, { id }, { models }) {
              return models.Category.findByPk(id)
        },
        async allArticle (root, args, { models }) {
              return models.Article.findAll()
        },
        async articleById (root, { id }, { models }) {
              return models.Article.findByPk(id)
        },
        async articlesByCategoryId (root, { categoryId }, { models }) {
            return models.Article.findAll({
                where: {
                    categoryId: categoryId
                }
            })
        },
        async allImage (root, args, { models }) {
            return models.Image.findAll()
        },
    },
    Mutation: {
        async createCategory (root, { name, description }, { models }) {
            return models.Category.create({
                name,
                description
              })
        },
        async createArticle (root, { categoryId, title, summary, content, author }, { models }) {
            return models.Article.create({ categoryId, title, summary, content, author })
        },
        async uploadImage (root, args, { models }){
            return args.image.then(image => {
                return models.Image.create(image)
            });
        },
    },
    Category: {
        async articles (category) {
            return category.getArticles()
        }
    },
    Article: {
        async category (article) {
            return article.getCategory()
        }
    }
}

module.exports = resolvers