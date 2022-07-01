import {useState, useEffect} from'react'

import TextField from '@mui/material/TextField';
const axios = require("axios");


const LocalInfo = (props) => {
    const [news, setNews] = useState([])
    const [showNews, setShowNews] = useState(true)
    const [input, setInput]=useState("");


    const getNews= () => {
        axios
        .request(options)
        .then(function (response) {
            setNews(response.data.articles)
            console.log(response.data.articles);
        })
        .catch(function (error) {
            // console.error(error);
        });
        
    }

    const options = {
        method: 'GET',
        url: 'https://free-news.p.rapidapi.com/v1/search',
        params: {
            q: 'boston, us', 
            lang: 'en'
        },
        headers: {
            'X-RapidAPI-Key': '4e0e7d2a56msh62686108837c30cp15097ejsn8e5d3e6f2a27',
            'X-RapidAPI-Host': 'free-news.p.rapidapi.com'
        }
    };
    const ShowAll = () => {
        return (
            <>
            <div className='localMapContainer'>
            {news.map((article) => {
            return(
                <div className='localContainer' key={article.id}>
                <h3>{article.title}</h3>
                <h5>{article.author}</h5>
                <h5>{article.link}</h5>
                <img id='eventImg' src={article.media} alt={article.name}></img>
                <h5>{article.link}</h5>
                <h5>{article.published_date}</h5>
                <h5>{article.summary}</h5>
                <h5>{article.twitter_account}</h5>
                
                </div> 
            )
            })}
        </div>
        </>
        )

    }

    useEffect(() => {
        getNews()
    }, [])
    return (
        <>
        <h1>Local News</h1>
        <div>
        <TextField id="outlined-helperText" label="Search field" type="search"           helperText="Search News in the Area"/>

        <textarea cols='50' rows='1' onInput={(e)=>setInput(e.target.value)}></textarea>
        </div>
        {showNews ? <ShowAll/> : null}
        </>
    )
}

export default LocalInfo