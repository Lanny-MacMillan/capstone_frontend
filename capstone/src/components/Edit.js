import {useState} from 'react'

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
            <form onSubmit={handleSubmit}>
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
                <input type="submit"/>
            </form>
        </>
    )
}

export default Edit