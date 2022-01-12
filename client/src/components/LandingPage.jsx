import React from 'react';
import {Link} from 'react-router-dom';
import styles from './styles/LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={styles.landing}>
            <div className={styles.world}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Hello World!</h1>
                    <Link to='/home'>
                        <button className={styles.button}>Log in</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
