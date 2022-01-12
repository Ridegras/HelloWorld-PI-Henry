import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/CountryCard.module.css';

const CountryCard = (data) => {
    const {name, image, continent, id} = data;

    return (
        <Link className={styles.container}
            to={'/country-details/' + id}
        >
            <img 
                className={styles.flag}
                src={image} 
                alt="country-flag" 
                />
            <div className={styles.description}>
                <h2>{name}</h2>
                <p>{continent}</p>
            </div>
        </Link>
    )
}

export default CountryCard
