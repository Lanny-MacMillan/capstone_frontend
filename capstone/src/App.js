import './App.css';
import {useState, useEffect} from'react'
import axios from 'axios'
import Add from './components/Add'
// import Edit from './components/Edit'
import Home from './components/Home'
import Translate from './components/Translate'
import Pricing from './components/Pricing'
import LocalInfo from './components/LocalInfo'
// import NavBar from './components/NavBar';
import * as React from 'react';
import { Route, Routes } from "react-router";
import ResponsiveAppBar from './components/NavBar';


function App() {
  const [activities, setActivities] = useState([])


  const APIBaseURL = 'https://glacial-tor-04352.herokuapp.com/api/events'
  // const APIBaseURL = 'http://localhost:8000/api/events'


  // const getActivities = () => {
  //   axios
  //       .get(APIBaseURL)
  //       .then(response => setActivities(response.data),
  //       (err)=> console.error(err)
  //       )
  //       .catch((error)=> console.error(error))
  // }

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
  // const handleUpdate =(editActivity) => {
  //   axios   
  //   // id updates ID in DB, editActivity brings the info from that function
  //     .put(APIBaseURL + '/' + editActivity.id, editActivity)
  //     .then((response) => {
  //       setActivities(activities.map((activity) => {
  //         console.log(activity.id)
  //         return activity.id !== editActivity.id ? activity : response.data
  //       }))
  //       // getActivities()
  //   })
  // }
  // const handleDelete = (deletedActivity) => {
  //   axios
  //     .delete(APIBaseURL + '/' + deletedActivity.id)
  //     .then((response) => {
  //       // Instead of pulling data and reloading this filters the data on page and removes the {deletedActivity.id}
  //       setActivities(activities.filter(activity => activity.id !== deletedActivity.id))
  //       // getActivities()
  //   })
  // }



  // useEffect(() => {
  //   getActivities()
  // }, [])



  return (
    <>
    <ResponsiveAppBar />
    <Routes>
      <Route path='Add' element={<Add 
                                    handleCreate={handleCreate}
                                    />} />
      <Route path='/' element={<Home 
                                  // Edit={Edit} 
                                  // activity={activity}
                                  // handleUpdate={handleUpdate}
                                  // handleDelete={handleDelete}
                                  />} />
        <Route path='Translate' element={<Translate />} />
        <Route path='Pricing' element={<Pricing />} />
        <Route path='LocalInfo' element={<LocalInfo />} />
    </Routes>



    {/* <h1 id='title'>Events</h1>
    <Add handleCreate={handleCreate}/><br/>
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
