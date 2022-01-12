import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';
import styles from './styles/Details.module.css';
import button from './styles/images/button.png';

const Details = () => {
    const params = useParams()
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDetail(params.id));
    },[dispatch]);

    const country = useSelector(state => state.detail);

    //PROBLEMA ACÁ (no se puede guardar ya que country es undefined al principio);
    // const {name, image, continent, 
    //     subregion, area, population, activities} = country[0];

    return (
        <div className={styles.container}>

            <Link to='/home'>
                <div className={styles.butContain}>
                    <img className={styles.button} src={button} alt="" />
                </div>
            </Link>

            {country.length
                ? <div className={styles.details}>
                    <div className={styles.info}>
                        <h1>{country[0].name}</h1>
                        <h3>Code: {country[0].id}</h3>

                        <h3>Capital: {
                                country[0].capital !== 'undefined' 
                                    ? country[0].capital 
                                    : '-'
                                }</h3>
                        <h3>Subregion: {
                                country[0].subregion !== 'undefined' 
                                    ? country[0].subregion 
                                    : '-'
                                }</h3>
                        
                        <h3>Area: {country[0].area} Km2</h3>
                        <h3>Population: {country[0].population}</h3>
                        <h3>Activities: </h3>
                        <ul>{country[0].activities.length
                            ? country[0].activities.map(act => (
                                <li key={act.id}>
                                    {`${act.name} - `}
                                    {act.duration ? ` ${act.duration} - ` : null}
                                    {act.season ? ` ${act.season} - ` : null}
                                    Difficulty: {act.difficulty}
                                </li>
                            ))
                            : 'No activities for this country'
                        }</ul>
                    </div>

                    <div className={styles.flag}>
                        <img src={country[0].image} alt="Flag" />
                    </div>
                </div>
                : 'Loading...'
            }
        </div>
    )
    
}

export default Details
