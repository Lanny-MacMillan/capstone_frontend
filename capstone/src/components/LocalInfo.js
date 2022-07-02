import {useState, useEffect} from'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
const axios = require("axios");


const LocalInfo = (props) => {
    const [news, setNews] = useState([])
    const [showNews, setShowNews] = useState(true)
    const [input,setInput] = useState("");

    const getNews= () => {
        axios
        .request(options)
        .then(function (response) {
            setNews(response.data.articles)
            // console.log(response.data.articles);
        })
        .catch(function (error) {
            // console.error(error);
        });
        
    }
    console.log(props.activities[0].location)

    const options = {
        method: 'GET',
        url: 'https://free-news.p.rapidapi.com/v1/search',
        params: {
            q: (props.activities[0].location), 
            // q: 'boston, us', 
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
                <Card sx={{ maxWidth: 700, m:4 }}>
                <CardMedia
                    component="img"
                    height="240"
                    image={article.media}
                    alt={article.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {article.summary}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
                </Card>
                // <div className='localContainer' key={article.id}>
                // <h3>{article.title}</h3>
                // <h5>{article.author}</h5>
                // <h5>{article.link}</h5>
                // <img id='eventImg' src={article.media} alt={article.name}></img>
                // <h5>{article.link}</h5>
                // <h5>{article.published_date}</h5>
                // <h5>{article.summary}</h5>
                // <h5>{article.twitter_account}</h5>
                // </div> 

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
        {showNews ? <ShowAll/> : null}
        </>
    )
}

export default LocalInfo