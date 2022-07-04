import axios from 'axios'
import {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import '../App.css';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


const Dashboard = () => {
    const [users, setUsers] = useState([])
    const [userLogIn, setUserLogIn] = useState(false)
    const [currentUser, setCurrentUser] = useState([])

    const BASE_URL = 'http://localhost:8000/api/'

    let emptyUser = {email: '', password: ''}
    


    const [user, setUser] = useState(emptyUser)

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }
    // const handleSubmitAddMore = (event) => {
    //     event.preventDefault()
    //     console.log(user)
    //     createUser(user)
    //     setUser({email: '', password: ''})

    // }
    const handleSubmitExit = (event) => {
        event.preventDefault()
        console.log(user)
        createUser(user)
        setUser({email: '', password: ''})
    }

    //========READ USER==============
    const getUsers = () => {
        axios
            .get(BASE_URL + 'useraccount')
            .then(
            (response) => setUsers(response.data),
            (err) => console.error(err)
            )
            .catch((error) => console.error(error))
        console.log(users)
    }
    //======== CREATE USER ==============
    const createUser = (addUser) => {
        axios
            .post(BASE_URL + 'useraccount', addUser)
            .then((response) => {
                setUsers([...user, addUser])
                // setView('login')
            })
    }
    // //======== RETURNING USER LOGIN ========
    const handleUserLogin = (userAccount) => {
        console.log('attempting to return user login')
        console.log(userAccount)
        axios
            .put(BASE_URL + 'useraccount/login', userAccount)
            .catch((error) => {
                if (error) {
                    console.log(".catch error")
                    console.log(error)
                    setUserLogIn(false)                }
            })
            .then((response) => {
                if (response == undefined){
                    console.log("undefined - no match")
                    console.log(response)
                    setUserLogIn(true)
                } else  {
                    console.log("match")
                    setUserLogIn(true)
                } 
            })
    }

    const handleUserLogin1 = (userAccount) => {
        axios.put(BASE_URL + 'useraccount/login' , userAccount)
        .then((response) => {
            if (response.data.email == null) {
                alert('Username and Password Do Not Match')
            } else {
                setUser(response.data)
                axios
                .get(BASE_URL + 'useraccount/' + response.data.id).then((response) => {
                setCurrentUser(response.data)
                })
            setUserLogIn(true)
            console.log(response.data)
        
            }
        })
    }
    // //============== LOGIN FORM ==============

    // const Login = () => {
    //     return(
    //         <>
    //         <div className='container'> 
    //             {users.map((user) => {
    //             return(
    //                 <>
    //                 <div className='container' key={user.id}>
    //                     <h6>User Email = {user.email}</h6>
    //                     <h6>User Password = {user.password}</h6>
    //                 </div>
    //                 </>
    //             )
    //             })}
    //         </div>
    //         <Typography variant="h4">Add New Event</Typography>
    //         <div className="container">
    //     <form>
    //         <TextField
    //             style={{ width: "400px", margin: "5px", align: 'center'}}
    //             type="text"
    //             label="Email"
    //             variant="outlined"
    //             name="email" 
    //             value={user.email}
    //             onChange={() => {handleChange()}}
    //         />
    //         <br />
    //         <TextField
    //             style={{ width: "400px", margin: "5px" }}
    //             type="text"
    //             label="Password"
    //             variant="outlined"
    //             name="password" 
    //             value={user.password}
    //             onChange={handleChange}
    //         />
    //         <br />
    //         <Button id='Button' onClick={handleSubmitExit} type="submit" variant="contained">Create Account</Button>
    //         <Button id='Button' onClick={handleUserLogin} type="submit" variant="contained">Login</Button><br/>

    //     </form>
    //         </div>
    //         </>
    //     )
    // }
    const UserPage = () => {
        return (
            <>
            <h1>User page goes here</h1>
            </>
        )
    }
    useEffect(() => {
        getUsers()
        }, [])

    return (
        <>
    Dashboard
    {/* <div className='container'> 
                {users.map((user) => {
                return(
                    <>
                    <div className='container' key={user.id}>
                        <h6>User Email = {user.email}</h6>
                        <h6>User Password = {user.password}</h6>
                    </div>
                    </>
                )
                })}
            </div> */}

            
        {userLogIn ? <UserPage/> : 
        <>
        <Typography variant="h4">Login Page</Typography>
            <div className="container">

        <form>
            <TextField
                style={{ width: "400px", margin: "5px", align: 'center'}}
                type="text"
                label="Email"
                variant="outlined"
                name="email" 
                value={user.email}
                onChange={handleChange}
            />
            <br />
            <TextField
                style={{ width: "400px", margin: "5px" }}
                type="text"
                label="Password"
                variant="outlined"
                name="password" 
                value={user.password}
                onChange={handleChange}
            />
            <br />
            <Button id='Button' onClick={handleSubmitExit} type="submit" variant="contained">Create Account</Button>
            <Button id='Button' onClick={handleUserLogin} type="submit" variant="contained">Login</Button><br/>

        </form>
            </div>
        
        </>
        
        
        }
        </>
    )
}
export default Dashboard