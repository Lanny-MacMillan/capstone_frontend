import {useState} from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useFormControl } from '@mui/material/FormControl';

const Add = (props) => {
    let emptyActivity = {name: '', date: '', description: '', image: '', location: '', price: '', notes:''}
    


    const [activity, setActivity] = useState(emptyActivity)
    const navigate = useNavigate();

    const handleChange = (event) => {
        setActivity({...activity, [event.target.name]: event.target.value})
    }
    const handleSubmitAddMore = (event) => {
        event.preventDefault()
        console.log(activity)
        props.handleCreate(activity)
        setActivity({name: '', date: '', description: '', image: '', location: '', price: '', notes:''})

    }
    const handleSubmitExit = (event) => {
        event.preventDefault()
        console.log(activity)
        props.handleCreate(activity)
        setActivity({name: '', date: '', description: '', image: '', location: '', price: '', notes:''})
        navigate(-1)
    }
    return (
        <>
        
        <div className='container'>
            <form onSubmit={handleSubmitExit}>
                {/* htmlFor creates a loop */}
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
                <Button id='Button' type="submit" variant="contained">Save and Exit</Button><br/>
                <Button id='Button' onClick={handleSubmitAddMore} type="submit" variant="contained">Save and Add Next</Button>
            </form>
            </div>
        </>
    )
}

export default Add