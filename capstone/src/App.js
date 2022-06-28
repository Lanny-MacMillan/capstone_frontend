import './App.css';
import {useState, useEffect} from'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'



function App() {
  const [events, setEvents] = useState([])

  const APIBaseURL = 'https://glacial-tor-04352.herokuapp.com/api/vacationevents'


  const getEvents = () => {
    axios
        .get(APIBaseURL)
        .then(response => setEvents(response.data),
        (err)=> console.error(err)
        )
        .catch((error)=> console.error(error))
  }
  const handleCreate = (addEvent) => {
    axios
      .post(APIBaseURL, addEvent)
      .then((response) => {
        // takes the existing state and spreads it, adds new object to the end
        setEvents([...events, response.data])
        // pulls all data and loads on the page
        // getEvents()
      })
  }
  const handleUpdate =(editEvent) => {
    axios   
    // id updates ID in DB, editEvent brings the info from that function
      .put(APIBaseURL + editEvent.id, editEvent)
      .then((response) => {
        setEvents(events.map((event) => {
          return event.id !== response.data.id ? event : response.data
        }))
        // getEvents()
    })
  }
  const handleDelete = (deletedEvent) => {
    axios
      .delete(APIBaseURL + deletedEvent.id)
      .then((response) => {
        // Instead of pulling data and reloading this filters the data on page and removes the {deletedPerson.id}
        setEvents(events.filter(event => event.id !== deletedEvent.id))
        // getEvents()
    })
  }



  useEffect(() => {
    getEvents()
  }, [])



  return (
    <>
    <h1 id='title'>Events</h1>
  
    <Add handleCreate={handleCreate}/><br/>
    <div class='container'>
    {events.map((event) => {
      return(
        <div class='event' key={event.id}>
          <h3>Name: {event.name}</h3>
          <h3>Date: {event.date}</h3>
          <img src={event.img} alt={event.name}></img>
          <h3>Description: {event.description}</h3>
          <h3>Location: {event.location}</h3>
          <h3>Price: {event.price}</h3>
          <h3>Notes: {event.notes}</h3>
          <Edit handleUpdate={handleUpdate} event={event}/>
          <button onClick={() => {handleDelete(event)}}>
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
