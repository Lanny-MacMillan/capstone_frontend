import {useState, useEffect, Link} from'react'
import axios from 'axios'
import Button from '@mui/material/Button';



const Home = (props) => {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [location, setLocation] = useState('')
    const [price, setPrice] = useState('')
    const [notes, setNotes] = useState('')
    const [activities, setActivities] = useState([])
    const [showActivities, setShowActivities] = useState(true)
    const [showActivity, setShowActivity] = useState(false)
    // console.log(props.activity)
    const [activity, setActivity] = useState([])


    const googleURL = `https://www.google.com/maps/embed/v1/search?key=${process.env.REACT_APP_API_KEY}&q=`
    const APIBaseURL = 'https://glacial-tor-04352.herokuapp.com/api/events'
    // const APIBaseURL = 'http://localhost:8000/api/events'
    // const handleNewName = (event) => {
    //     console.log(event.target.value)
    //     setName(event.target.value)
    // }
    const handleNewDate = (event) => {
        // console.log(event.target.value)
        setDate(event.target.value)
    }
    const handleNewDescription = (event) => {
        // console.log(event.target.value)
        setDescription(event.target.value)
    }
    const handleNewImage = (event) => {
        // console.log(event.target.value)
        setImage(event.target.value)
    }
    const handleNewLocation = (event) => {
        // console.log(event.target.value)
        setLocation(event.target.value)
    }
    const handleNewPrice= (event) => {
        // console.log(event.target.value)
        setPrice(event.target.value)
    }
    const handleNewNotes = (event) => {
        // console.log(event.target.value)
        setNotes(event.target.value)
    }
    const getActivities = () => {
        axios
            .get(APIBaseURL)
            .then(response => setActivities(response.data),
            (err)=> console.error(err)
            )
            .catch((error)=> console.error(error))
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
                <h5>Location: {activity.location}</h5>
                <h5>Price: {activity.price}</h5>
                <Button id='Button' variant="contained" onClick={() => {showPage(activity)}} className="btn btn-link" role="button">Expand</Button>
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
            <div className='container'>
                {activities.map((activity) => {
                return(
                <div className="showContainer"  key={activity.id}>
                    <div className="showImg">
                        <img className="single-page-image" src={activity.image} alt={activity.name} id='showImg'></img>
                    </div>
                <div className="description">
                    <h1 className='showHeader'>{activity.name}</h1>
                    <h5>{activity.description}</h5>
                </div>
                <div className="stats">
                    <h2> Some Stuff goes here</h2>
                    <h5>${activity.price}.00</h5>
                    <h5>{activity.notes}</h5>
                </div>
                <div className="mapsApi">
                <h5>{activity.location}</h5>
            {/*============= GOOGLE MAPS API =============*/}
                <iframe
                    className="map"
                    width='100%'
                    height='100%'
                    loading='lazy'
                    src={`${googleURL} + ${activity.location}`}>
                </iframe>
            {/*============= GOOGLE MAPS API =============*/}
                </div>
            {/*============= DELETE MODAL TRIGGER =============*/}
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteModal">
                Delete modal
                </button>
            {/*================= DELETE MODAL ================*/}
                <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Confirm Delete</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this Event Permanantly?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <Button data-bs-dismiss="modal" onClick={() => {handleDelete(activity)}}>
                        Delete</Button>
                    </div>
                    </div>
                </div>
                </div>
            {/*============= EDIT MODAL TRIGGER =============*/}
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">
                Edit modal
                </button>
            {/*================= EDIT MODAL ================*/}
            <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Confirm Edit</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit={handleSubmit}>
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
                        <input data-bs-dismiss="modal" type="submit"/>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>

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
    
    const handleChange = (event) => {
        console.log(event.target.value)
        setActivity({...activity, [event.target.name]: event.target.value})
    }
    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     console.log(activity.name)
    //     props.handleUpdate(activity)
    //     // getActivities()
    // }
    const handleUpdate =(editActivity) => {
        console.log('before .put Home.js')
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
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(
            'https://glacial-tor-04352.herokuapp.com/api/events/'+ event, event.id,
            {
                name:name,
                date:date,
                description:description,
                image:image,
                location:location,
                price:price,
                notes:notes,
                
            }//then request is so we dont have to reload page on submission
            ).then(()=>{
            axios
                .get(
                    'https://glacial-tor-04352.herokuapp.com/api/events'
                    )
                .then((response)=>{
                    setActivities(response.data)
                })
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