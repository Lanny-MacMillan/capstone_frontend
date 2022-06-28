import './App.css';
import {useState, useEffect} from'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
import * as React from 'react';
import Button from '@mui/material/Button';




function App() {
  const [activities, setActivities] = useState([])

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



  useEffect(() => {
    getActivities()
  }, [])



  return (
    <>
    <h1 id='title'>Events</h1>
    <Button variant="contained">Hello World</Button>
    <Add handleCreate={handleCreate}/><br/>
    <div className='container'>
    {activities.map((activity) => {
      return(
        <div className='event' key={activity.id}>
          <h3>Name: {activity.name}</h3>
          <h3>Date: {activity.date}</h3>
          <img src={activity.img} alt={activity.name}></img>
          <h3>Description: {activity.description}</h3>
          <h3>Location: {activity.location}</h3>
          <h3>Price: {activity.price}</h3>
          <h3>Notes: {activity.notes}</h3>
          <Edit handleUpdate={handleUpdate} activity={activity}/>
          <button onClick={() => {handleDelete(activity)}}>
          Delete
          </button>
        </div> 
      )
    })}
    </div>

    </>
  );
}

export default App;
