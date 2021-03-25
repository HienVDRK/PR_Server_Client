import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client"
import client from "../apollo-client"
import { useRouter } from 'next/router'

export default function Home(props) {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <Head>
        <title>Tin tức</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
            Welcome to page News!
        </h1>

        <div className={styles.grid} >
            {props.allArticle.map((value, index) => (
              <Link
                href={{ pathname: `/detail`, query: { id: value.id } }}
                key={index}>
                <div className={styles.card}>
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
  )
}


export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query allArticle{ 
        allArticle{
          id
          title
          summary
          content
          author
          category {
            name
            description
          }
        }
      }
    `,
  });
  return {
    props: {
      allArticle: data.allArticle,
    },
 };
}

