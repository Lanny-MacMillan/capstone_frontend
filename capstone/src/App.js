import './App.css';
import {useState, useEffect} from'react'
import axios from 'axios'
import Add from './components/Add'
import Home from './components/Home'
import Translate from './components/Translate'
import Pricing from './components/Pricing'
import LocalInfo from './components/LocalInfo'
import Profile from './components/Profile'
import Account from './components/Account'
import Dashboard from './components/Dashboard'
import Logout from './components/Logout'
import * as React from 'react';
import { Route, Routes} from "react-router";
import ResponsiveAppBar from './components/NavBar';

function App() {
  const [activities, setActivities] = useState([])
  const [activity, setActivity] = useState({})

  const APIBaseURL = 'https://glacial-tor-04352.herokuapp.com/api/events'

// =================================== CRUD ===============================
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
    console.log('before .put App.js')
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
  const handleChange = (event) => {
    setActivity({...activity, [event.target.name]: event.target.value})
}

  useEffect(() => {
    getActivities()
  }, [])

  return (
    <>
    <ResponsiveAppBar/>
    <Routes>
        <Route path='/' element={<Home 
                                  handleUpdate={handleUpdate}
                                  handleSubmit={handleSubmit}
                                  handleChange={handleChange}
                                  />} />
        <Route path='Add' element={<Add 
                                    activities={activities}
                                    handleCreate={handleCreate}
                                    />} />
        <Route path='Translate' element={<Translate />} />
        <Route path='LocalInfo' element={<LocalInfo 
                                          activities={activities}
                                          />} />
        <Route path='Pricing' element={<Pricing />} />
        <Route path='Profile' element={<Profile />} />
        <Route path='Account' element={<Account />} />
        <Route path='Dashboard' element={<Dashboard />} />
        <Route path='Logout' element={<Logout />} />
    </Routes>
    </>
  );
}

export default App;
