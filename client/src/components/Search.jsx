import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from '../actions';
import styles from './styles/Search.module.css';
import search from './styles/images/search.png';

const Search = ({setCurrPage}) => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleChange = e =>{
        e.preventDefault();
        setName(e.target.value);
        dispatch(getName(e.target.value));
        setCurrPage(1)
    }
    
    const handleSubmit = e =>{
        e.preventDefault();
        dispatch(getName(name));
        setName('');
        setCurrPage(1)
    }

    return (
        <div className={styles.container}>
            <input className={styles.input}
                type="text" 
                placeholder='Search'
                onChange={e => handleChange(e)}
                value={name}
            />
            <div 
                className={styles.submit}
                onClick={e => handleSubmit(e)}
            ><img 
                className={styles.button}
                src={search} 
                alt="search-button" /></div>
        </div>
    )
}

export default Search
