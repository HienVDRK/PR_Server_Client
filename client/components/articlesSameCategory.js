import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { gql, useQuery } from "@apollo/client"

export default function ArticlesSameCategory(props) {
    let idCategory = props.idCategory;
    const GET_ARTICLES_BY_CATEGORY_ID = gql`
    query articlesByCategoryId{ 
      articlesByCategoryId(categoryId: ${idCategory}){
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
  return (
    <>
        <div className={styles.grid} >
            {menuData && menuData.map((value, index) => (
              <Link
                href={{ pathname: `/detail`, query: { id: value.id } }}
                key={index}>
                <div className={styles.card}>
                  <h3>{value.title}</h3>
                  <h5>{value.author}</h5>
                </div>
              </Link>
            ))}
        </div>
    </>
  )
}