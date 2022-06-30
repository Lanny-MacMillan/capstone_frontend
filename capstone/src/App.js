import './App.css';
import {useState, useEffect} from'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
import Home from './components/Home'
import Translate from './components/Translate'
import Pricing from './components/Pricing'
import LocalInfo from './components/LocalInfo'
import * as React from 'react';
import { Route, Routes} from "react-router";
import ResponsiveAppBar from './components/NavBar';
import Button from '@mui/material/Button';


function App() {
  const [activities, setActivities] = useState([])
  const [activity, setActivity] = useState({})
  const [showActivities, setShowActivities] = useState(true)
  const [showActivity, setShowActivity] = useState(false)

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
  const handleCreate = (addActivity) => {
    axios
      .post(APIBaseURL, addActivity)
      .then((response) => {
        setActivities([...activities, response.data])
        .catch((error) => {
          console.log("Problem submitting New Post", error);
        });
        // getActivities()
      }
      )
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log(activity.name)
    handleUpdate(activity)
    // getActivities()
}
  const handleUpdate =(editActivity) => {
    axios   
    // id updates ID in DB, editActivity brings the info from that function
      .put(APIBaseURL + '/' + editActivity.id, editActivity)
      .then((response) => {
        setActivities(activities.map((activity) => {
          console.log(activity.id)
          return activity.id !== editActivity.id ? activity : response.data
        }))
        // getActivities()
    })
  }
  const handleDelete = (deletedActivity) => {
    axios
      .delete(APIBaseURL + '/' + deletedActivity.id)
      .then((response) => {
        // Instead of pulling data and reloading this filters the data on page and removes the {deletedActivity.id}
        setActivities(activities.filter(activity => activity.id !== deletedActivity.id))
        // getActivities()
    })
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
      <Edit handleUpdate={handleUpdate} activity={activity}/>
      </div>
      )
      })}
      </div>
  </>
  )
  }
  const showPage = (selectedActivity) => {
    setShowActivities(false)
    setShowActivity(true)
    setActivities(activities.filter(activity => activity.id == selectedActivity.id))
}
const hideAll = () => {
  setShowActivities(false)
  setShowActivity(false)
}
  useEffect(() => {
    getActivities()
  }, [])

  return (
    <>
    <ResponsiveAppBar />
    <Routes>
        {/* <Route path='/' element={<Home 
                                  Edit={Edit}
                                  handleUpdate={handleUpdate}
                                  handleSubmit={handleSubmit}/>} /> */}
        <Route path='Add' element={<Add 
                                    handleCreate={handleCreate}
                                    />} />
        <Route path='Translate' element={<Translate />} 


        />
        <Route path='LocalInfo' element={<LocalInfo />} />
        <Route path='Pricing' element={<Pricing />} />
        <Route path='{activity.id}'  />
    </Routes>
    {showActivities ? <DisplayAll/> : null}
    {showActivity ? <DisplayOne/> : null}     



    {/* <h1 id='title'>Events</h1>
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
          <Edit handleUpdate={handleUpdate} activity={activity}/>
          <button onClick={() => {handleDelete(activity)}}>
          Delete
          </button>
        </div> 
      )
    })}
    </div> */}

    </>
  );
}

export default App;
