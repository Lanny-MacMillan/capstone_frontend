import {useState} from 'react'

const Add = (props) => {
    let emptyEvent = {name: '', date: '', description: '', image: '', location: '', price: '', notes: ''}

    const [event, setEvent] = useState(emptyEvent)

    const handleChange = (event) => {
        setEvent({...event, [event.target.name]: event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event)
        props.handleCreate(event)
        setEvent({name: '', date: '', description: '', image: '', location: '', price: '', notes: ''})
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* htmlFor creates a loop */}
                <label htmlFor="name">Name: </label><br/>
                <input type="text" name="name" value={event.name}
                onChange={handleChange}/>
                <br/>
                <br/>
                <label htmlFor="date">Date: </label><br/>
                <input type="text" name="date" value={event.date}
                onChange={handleChange}/>
                <br/>
                <br/>
                <label htmlFor="description">Description: </label><br/>
                <input type="text" name="description" value={event.description}
                onChange={handleChange}/>
                <br/>
                <br/>
                <label htmlFor="img">Img: </label><br/>
                <input type="text" name="img" value={event.img}
                onChange={handleChange}/>
                <br/>
                <br/>
                <label htmlFor="location">Location: </label><br/>
                <input type="text" name="location" value={event.location}
                onChange={handleChange}/>
                <br/>
                <br/>
                <label htmlFor="price">Price: </label><br/>
                <input type="number" name="price" value={event.price}
                onChange={handleChange}/>
                <br/>
                <br/>
                <label htmlFor="notes">Notes: </label><br/>
                <input type="text" name="img" value={event.notes}
                onChange={handleChange}/>
                <br/>
                <input type="submit"/>
            </form>
        </>
    )
}

export default Add