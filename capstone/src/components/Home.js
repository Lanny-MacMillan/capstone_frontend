import {useState, useEffect, Link} from'react'
import axios from 'axios'
import Button from '@mui/material/Button';



const Home = (props) => {

    const [activities, setActivities] = useState([])
    const [showActivities, setShowActivities] = useState(true)
    const [showActivity, setShowActivity] = useState(false)
    // console.log(props.activity)
    const [activity, setActivity] = useState({...props.activity})
    const [name, setName] = useState({})
    const [date, setDate] = useState({})
    const [description, setDescription] = useState({})
    const [image, setImage] = useState({})
    const [location, setLocation] = useState({})
    const [price, setPrice] = useState({})
    const [notes, setNotes] = useState({})

    const googleURL = `https://www.google.com/maps/embed/v1/search?key=${process.env.REACT_APP_API_KEY}&q=`
    const APIBaseURL = 'https://glacial-tor-04352.herokuapp.com/api/events'
    // const APIBaseURL = 'http://localhost:8000/api/events'
    
    const getActivities = () => {
        axios
            .get(APIBaseURL)
            .then(response => setActivities(response.data),
            (err)=> console.error(err)
            )
            .catch((error)=> console.error(error))
        }
    const handleEdit = () => {
            return (
                <>
                    {/* <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name: </label><br/>
                        <input type="text" name="name" value={activity.name}
                        onChange={handleChange}/>
                        <br/>
                        <br/>
                        <label htmlFor="date">Date: </label><br/>
                        <input type="text" name="date" value={activity.date}
                        onChange={handleChange}/>
                        <br/>
                        <br/>
                        <label htmlFor="description">Description: </label><br/>
                        <input type="text" name="description" value={activity.description}
                        onChange={handleChange}/>
                        <br/>
                        <br/>
                        <label htmlFor="image">Image: </label><br/>
                        <input type="text" name="image" value={activity.image}
                        onChange={handleChange}/>
                        <br/>
                        <br/>
                        <label htmlFor="location">Location: </label><br/>
                        <input type="text" name="location" value={activity.location}
                        onChange={handleChange}/>
                        <br/>
                        <br/>
                        <label htmlFor="price">Price: </label><br/>
                        <input type="number" name="price" value={activity.price}
                        onChange={handleChange}/>
                        <br/>
                        <br/>
                        <label htmlFor="notes">Notes: </label><br/>
                        <input type="text" name="notes" value={activity.notes}
                        onChange={handleChange}/>
                        <br/>
                        <input type="submit"/>
                    </form> */}
                </>
            )
    }
    
    const DisplayAll = () => {
        return (
            <>
            <h1>Home</h1>

        <div className='container'>
            {activities.map((activity) => {
            return(
                <div className='event' key={activity.id}>
                <h3>Name: {activity.name}</h3>
                <h5>Date: {activity.date}</h5>
                <img id='eventImg' src={activity.image} alt={activity.name}></img>
                <h5>Description: {activity.description}</h5>
                <h5>Location: {activity.location}</h5>
                <h5>Price: {activity.price}</h5>
                <h5>Notes: {activity.notes}</h5>
                <a href='#' onClick={() => {showPage(activity)}} class="btn btn-link" role="button">Expand</a>
                </div> 
            )
            })}
        </div>
        </>
        )
    }
    const DisplayOne = () => {
        return (
        <>
            <div class='container'>
                {activities.map((activity) => {
                return(
                <div class="showContainer">
                    <div class="showImg">
                        <img className="single-page-image" src={activity.image} alt={activity.name} id='showImg'></img>
                    </div>
                <div class="description">
                    <h1 class='showHeader'>{activity.name}</h1>
                    <h5>{activity.description}</h5>
                </div>
                <div class="stats">
                    <h2> Some Stuff goes here</h2>
                    <h5>${activity.price}.00</h5>
                    <h5>{activity.notes}</h5>
                </div>
                <div class="mapsApi">
                <h5>{activity.location}</h5>
            {/*============= GOOGLE MAPS API =============*/}
                {/* <iframe
                    className="map"
                    width='100%'
                    height='100%'
                    loading='lazy'
                    src={`${googleURL} + ${activity.location}`}>
                </iframe> */}
            {/*============= GOOGLE MAPS API =============*/}
                </div>

            <Button onClick={() => {handleDelete(activity)}}>
            Delete</Button>
            {/* <Button onClick={() => {handleEdit(activity)}}>
            Edit</Button> */}
            {/* <details> */}
            {/* <summary>Edit Activity</summary>
            <form onSubmit={props.handleSubmit}>
                    <label htmlFor="name">Name: </label><br/>
                    <input type="text" name="name" value={activity.name}
                    onChange={handleNameChange}/>
                    <br/>
                    <br/>
                    <label htmlFor="date">Date: </label><br/>
                    <input type="text" name="date" value={activity.date}
                    onChange={handleDateChange}/>
                    <br/>
                    <br/>
                    <label htmlFor="description">Description: </label><br/>
                    <input type="text" name="description" value={activity.description}
                    onChange={handleDescriptionChange}/>
                    <br/>
                    <br/>
                    <label htmlFor="image">Image: </label><br/>
                    <input type="text" name="image" value={activity.image}
                    onChange={handleImageChange}/>
                    <br/>
                    <br/>
                    <label htmlFor="location">Location: </label><br/>
                    <input type="text" name="location" value={activity.location}
                    onChange={handleLocationChange}/>
                    <br/>
                    <br/>
                    <label htmlFor="price">Price: </label><br/>
                    <input type="number" name="price" value={activity.price}
                    onChange={handlePriceChange}/>
                    <br/>
                    <br/>
                    <label htmlFor="notes">Notes: </label><br/>
                    <input type="text" name="notes" value={activity.notes}
                    onChange={handleNotesChange}/>
                    <br/>
                    <input type="submit"/>
            
            </form>  */}
            {/* </details> */}
            </div>
            )
            })}
            </div>
        </>
        )
    }

    const homePage = () => {
        getActivities()
        setShowActivities(true)
        setShowActivity(false)
    }
    const showPage = (selectedActivity) => {
        setShowActivities(false)
        setShowActivity(true)
        setActivities(activities.filter(activity => activity.id == selectedActivity.id))
    }
    
    const handleNameChange = (event) => {
        setName({[event.target.name]: event.target.value})
    }
    const handleDateChange = (event) => {
        setName({[event.target.name]: event.target.value})
    }
    const handleDescriptionChange = (event) => {
        setName({[event.target.name]: event.target.value})
    }
    const handleImageChange = (event) => {
        setName({[event.target.name]: event.target.value})
    }
    const handleLocationChange = (event) => {
        setName({[event.target.name]: event.target.value})
    }
    const handlePriceChange = (event) => {
        setName({[event.target.name]: event.target.value})
    }
    const handleNotesChange = (event) => {
        setName({[event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(activity.name)
        handleUpdate(activity)
        // getActivities()
    }
    const handleUpdate =(editActivity) => {
        axios   
        // id updates ID in DB, editActivity brings the info from that function
            .put(APIBaseURL + '/' + editActivity.id, editActivity)
            .then((response) => {
                console.log(activity.id)
                setActivities(activities.map((activity) => {
                // return activity.id !== response.data.id ? activity : response.data
                return activity.id !== editActivity.id ? activity : response.data
                
                }))
                getActivities()
            })
        }
    const handleDelete = (deletedActivity) => {
        axios
            .delete(APIBaseURL + '/' + deletedActivity.id)
            .then((response) => {
                // Instead of pulling data and reloading this filters the data on page and removes the {deletedActivity.id}
                // setActivities(activities.filter(activity => activity.id !== deletedActivity.id))
                homePage()
            })
    }


    useEffect(() => {
    getActivities()
    }, [])
    return (
        <>
        {showActivities ? <DisplayAll/> : null}
        {showActivity ? <DisplayOne/> : null}     
        </>
    )
}

export default Home