import React from 'react'
import styles from './styles/Pages.module.css';

const Pages = ({countriesOnPage, countries, pages, currPage}) => {

    const pagNum = [];

    for (let i = 1; i <= Math.ceil(countries / countriesOnPage); i++) {
        pagNum.push(i);
    }

    return (
        <div className={styles.pagesList}>
            {pagNum.length
                ? pagNum.map(n =>(

                    n === currPage
                        ? <span onClick={()=> pages(n)} 
                            key={n} 
                            className={styles.active}> {n} </span>
                        : <span onClick={()=> pages(n)} 
                            key={n} 
                            className={styles.num}> {n} </span>

                    ))
                : null
            }
        </div>
    )
}

export default Pages
