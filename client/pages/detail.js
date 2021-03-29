import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { gql, useQuery } from "@apollo/client"
import { useRouter } from 'next/router'
import { Typography, Divider } from 'antd';
const { Title, Paragraph, Text } = Typography;
import ArticlesSameCategory from '../components/articlesSameCategory'

export default function Detail() {
  const router = useRouter()
  const idArticle = router.query.id

  const GET_ARTICLE_BY_ID = gql`
  query articleById{ 
      articleById(id: ${idArticle}){
        id
        title
        summary
        content
        author
        category {
          id
          name
          description
        }
      }
    }
  `;

  const getArticleById = useQuery(GET_ARTICLE_BY_ID)
  const restaurantData = getArticleById && getArticleById.data && getArticleById.data.articleById
  return (
    <div style={{ padding: "20px"}}>
      <Head>
        <title>
          {restaurantData && restaurantData.id}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <span onClick={() => router.back()}>Back</span>
      <h1 className={styles.title}>
          Detail Article
      </h1>
      <Typography>
        <Title>{restaurantData && restaurantData.title}</Title>
        <Paragraph>
          {restaurantData && restaurantData.summary}
        </Paragraph>
        <Paragraph>
          {restaurantData && restaurantData.content}
        </Paragraph>
        <Paragraph>
          {restaurantData && restaurantData.author}
        </Paragraph>
      </Typography>

      <h2>
        Articles of the same Category
      </h2>
      <ArticlesSameCategory idCategory= {restaurantData && restaurantData.category.id}/>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}


