import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client"
import client from "../apollo-client"
import { useRouter } from 'next/router'
import 'antd/dist/antd.css';
import { Typography, Divider } from 'antd';
const { Title, Paragraph, Text } = Typography;
import _ from 'lodash';

export default function Home(props) {
 const router = useRouter()
 let grouped =_.chain(props.allArticle)
      .groupBy("category.name")
      .map((value, key) => ({ nameCate: key, listArctile: value }))
      .value();
  return (
    <>
        <Head>
          <title>Tin tức</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className={styles.title}>
            Welcome to page News!
        </h1>

        <div className={styles.grid}>
            {grouped.map((value, index1) => (
              <>
              <h2 style={{paddingLeft: "20px"}}>{value.nameCate}</h2>
                {value.listArctile.map((value, index2) => (
                  <Link href={{ pathname: `/detail`, query: { id: value.id } }}>
                    <div className={styles.card}>
                      <h4>{value.title}</h4>
                      <h4>{value.summary}</h4>
                      <h5>{value.author}</h5>
                    </div>
                  </Link>
                ))}
              </>
            ))}
        </div>

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
    </>
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
            id
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

