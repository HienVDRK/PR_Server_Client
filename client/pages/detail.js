import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { gql, useQuery } from "@apollo/client"
import client from "../apollo-client"
import { useRouter } from 'next/router'

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

  // const { data, error, loading } = useQuery(GET_ARTICLES_BY_CATEGORY_ID);
  const getArticleById = useQuery(GET_ARTICLE_BY_ID)
  const restaurantData = getArticleById && getArticleById.data && getArticleById.data.articleById

  const GET_ARTICLES_BY_CATEGORY_ID = gql`
    query articlesByCategoryId{ 
      articlesByCategoryId(categoryId: ${restaurantData && restaurantData.category.id}){
        id
        title
        summary
        content
        author
      }
    }
  `;
  const menuQueryResult = useQuery(GET_ARTICLES_BY_CATEGORY_ID)
  const menuData = menuQueryResult && menuQueryResult.data && menuQueryResult.data.articlesByCategoryId

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error...</p>
  return (
    <>
    <span onClick={() => router.back()}>back</span>
    <div className={styles.container}>
      <Head>
        <title>
          {restaurantData && restaurantData.id}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
            Detail Article
        </h2>
        <div className={styles.grid} >
            <div className={styles.card}>
              <h3>{restaurantData && restaurantData.id}</h3>
              <h3>{restaurantData && restaurantData.title}</h3>
              <h4>{restaurantData && restaurantData.summary}</h4>
              <h5>{restaurantData && restaurantData.author}</h5>
              <h5>{restaurantData && restaurantData.category.id}</h5>
            </div>
        </div>
        <br/>
        <h2 className={styles.title}>
          Articles of the same Category
        </h2>
        <div className={styles.grid} >
            {menuData && menuData.map((value, index) => (
              <Link
                href={{ pathname: `/detail`, query: { id: value.id } }}
                key={index}>
                <div className={styles.card}>
                  <h3>{value.id}</h3>
                  <h3>{value.title}</h3>
                  <h4>{value.summary}</h4>
                  <h5>{value.author}</h5>
                </div>
              </Link>
            ))}
        </div>
      </main>

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
    </>
  )
}


