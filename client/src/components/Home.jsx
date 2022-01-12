import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, filterContinent, filterActivity, 
    orderName, orderPopulation, getActivities } from '../actions';
import CountryCard from './CountryCard';
import Pages from './Pages';
import Search from './Search';
import styles from './styles/Home.module.css';
import reload from './styles/images/reload.png';

const Home = () => {
    //Hooks de redux para traer los estados
    const dispatch = useDispatch();
    const countries = useSelector(state => state.renderCountries);
    const activities = useSelector(state => state.activities);

    useEffect(()=>{
        dispatch(getCountries());
        dispatch(getActivities());
    },[dispatch])

    const handleClick = e =>{
        e.preventDefault();
        dispatch(getCountries());
        dispatch(getActivities());
    }

    //PAGINADO ////////////////////////////////////////////
    const [currPage, setCurrPage] = useState(1);    
    const countriesOnPage = 10;
    const ixLastCountry = currPage * countriesOnPage;
    const ixFirstCountry = ixLastCountry - countriesOnPage;
    const currCountries = countries.slice(ixFirstCountry, ixLastCountry);

    // 1 ------ c[0] ------ c[9]
    // 2 ------ c[10] ----- c[19]
    // 3 ------ c[20] ----- c[29]

    const pages = (pagNum) =>{
        setCurrPage(pagNum);
    }

    //////////ORDENADORES Y FILTERS////////////////////////////

    const [render, setRender] = useState({
        alpha: 'Alphabetic',
        continent: 'World',
        population: 'Population',
        act: 'Activities'
    });

    const handleContinent = e =>{
        dispatch(filterContinent(e.target.value));
        setRender({
            ...render, continent: e.target.value, 
            act: 'Activities', alpha: 'Alphabetic', population: 'Population'
        });
        setCurrPage(1);
    }

    const handleAlphabet = e =>{
        dispatch(orderName(e.target.value))
        setRender({...render, alpha: e.target.value, population: 'Population'});
        setCurrPage(1);
    }

    const handlePop = e =>{
        dispatch(orderPopulation(e.target.value))
        setRender({...render, population: e.target.value, alpha: 'Alphabetic'});
        setCurrPage(1);
    }
    
    const handleActivity = e =>{
        dispatch(filterActivity(e.target.value));
        setRender({
            ...render, act: e.target.value, 
            continent: 'World', population: 'Population',
            alpha: 'Alphabetic'
        });
        setCurrPage(1);
    }

    ////////// Input ////////////
    
    return (
        <div className={styles.home}>

            <nav className={styles.navbar}>
                <div className={styles.searchSection}>
                    <Search setCurrPage={setCurrPage}/>

                    <div onClick={e => handleClick(e)}
                        className={styles.butContain}>
                        <img className={styles.button} src={reload} alt="" />
                    </div>
                </div>

                <div className={styles.sortSection}>
                    <select onChange={e => handleContinent(e)} value={render.continent}>
                        <option value="wrld">World</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Antarctic">Antartic</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>

                    <select onChange={e => handleActivity(e)} value={render.act}>
                        <option selected disabled>Activities</option>
                        {activities.map(act => (
                            <option key={act} value={act}>
                                {act}
                            </option>
                        ))}
                    </select>

                    <select onChange={e => handleAlphabet(e)} value={render.alpha}>
                        <option selected disabled>Alphabetic</option>
                        <option value="A-Z">A to Z</option>
                        <option value="Z-A">Z to A</option>
                    </select>

                    <select onChange={e => handlePop(e)} value={render.population}>
                        <option selected disabled>Population</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

                <div className={styles.createSection}>
                <Link className={styles.create} to='/create-activity'>
                    Create Activity
                </Link>
                </div>
            </nav>

            <div className={styles.cardsContainer}>
                {currCountries.length
                    ? currCountries.map(c =>(
                        <div className={styles.card}
                            key = {c.id}>
                            <CountryCard 
                                id = {c.id}
                                name = {c.name}
                                continent = {c.continent}
                                image = {c.image}/>
                        </div>
                    ))
                    : <h2>Country not found</h2>
                }
            </div>

            <Pages
                countriesOnPage={countriesOnPage}
                countries={countries.length}
                pages={pages}
                currPage={currPage}
            />
        </div>
    )
}

export default Home
