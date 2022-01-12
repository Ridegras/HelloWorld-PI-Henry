import axios from 'axios';

export const getCountries = ()=>{
    return async (dispatch)=>{
        let json = await axios("/countries");
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}

export const filterContinent = payload =>{
    return {
        type: 'FILTER_CONTINENT',
        payload
    }
}

export const getActivities = () =>{
    return async (dispatch)=>{
        let json = await axios("/activity");
        return dispatch({
            type: "GET_ACT",
            payload: json.data
        })
    }
}

export const filterActivity = payload =>{
    return {
        type: "FILTER_ACT",
        payload
    }
}

export const orderName = payload =>{
    return {
        type: "ORDER_NAME",
        payload
    }
}

export const orderPopulation = payload =>{
    return {
        type: "ORDER_POPULATION",
        payload
    }
}

export const getName = name => {
    return async (dispatch)=>{
        try {
            let json = await axios(`/countries?name=${name}`);
            return dispatch({
                type: 'GET_NAME',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const postActivity = (form)=>{
    return async (dispatch)=>{
        const response = await axios.post('/activity', form);
        return dispatch({
            type: 'POST_ACT',
            payload: response
        })
    }
}

export const getDetail = id =>{
    return async dispatch =>{
        try {
            let json = await axios(`/countries/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}