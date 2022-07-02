import {useState} from 'react'
import Button from '@mui/material/Button';

const Edit = (props) => {
    const [activity, setActivity] = useState({...props.activity})

    const handleChange = (event) => {
        setActivity({...activity, [event.target.name]: event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(activity)
        props.handleUpdate(activity)
    }
    return (
        <>
        <Button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit Modal
        </Button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Activity</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label><br/>
                <input type="text" name="name" value={activity.name}
                onChange={handleChange}/>

                <br/>
                <label htmlFor="date">Date: </label><br/>
                <input type="text" name="date" value={activity.date}
                onChange={handleChange}/>

                <br/>
                <label htmlFor="description">Description: </label><br/>
                <input type="text" name="description" value={activity.description}
                onChange={handleChange}/>

                <br/>
                <label htmlFor="image">Image: </label><br/>
                <input type="text" name="image" value={activity.image}
                onChange={handleChange}/>

                <br/>
                <label htmlFor="location">Location: </label><br/>
                <input type="text" name="location" value={activity.location}
                onChange={handleChange}/>

                <br/>
                <label htmlFor="price">Price: </label><br/>
                <input type="number" name="price" value={activity.price}
                onChange={handleChange}/>

                <br/>
                <label htmlFor="notes">Notes: </label><br/>
                <input type="text" name="notes" value={activity.notes}
                onChange={handleChange}/>
                <br/>
                <input type="submit" class="btn btn-dark" data-bs-dismiss="modal"/>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Edit