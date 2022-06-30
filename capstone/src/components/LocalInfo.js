import {useState, useEffect} from'react'
const axios = require("axios");


const LocalInfo = () => {
    
    

    const options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/forecast',
        params: {q: 'san francisco,us'},
        headers: {
            'X-RapidAPI-Key': '4e0e7d2a56msh62686108837c30cp15097ejsn8e5d3e6f2a27',
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
        }
    };

    
    axios
        .request(options)
        .then(function (response) {
            console.log(response.data.city);
        }) 
        .catch(function (error) {
            console.error(error);
    });



    return (
        <>
        <h1>Weather</h1>

        </>
    )
}

export default LocalInfo