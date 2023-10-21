import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom'

const URL = "http://localhost:5555/api/createuser"

export default function Signup() {

    const [credentials, setCredentials] = useState({name:"", email:"", password:"", location:"" });

    function handlecChange(event){
        setCredentials({...credentials, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();

        const response = await fetch(URL, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.location}) 
            
        });
        const json = await response.json();
        console.log(json);

        if(!json.success) {
            alert(json.errors[0].msg);
        } else {
            console.log("user Created");
        }
    }
 
  return (
    <>
        <Navbar/>
            <div className='container p-5'>
                <form onSubmit={handleSubmit} action="/signup" method="post">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={credentials.name} onChange={handlecChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="InputEmail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="InputEmail" name="email" value={credentials.email} onChange={handlecChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="InputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="InputPassword1" name="password" value={credentials.password} onChange={handlecChange}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" name="location" value={credentials.location} onChange={handlecChange}/>
                    </div>

                    {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}


                    <button type="submit" className="mr-3 btn btn-danger">Submit</button>
                    <Link to="/login" className="m-3 btn btn-outline-danger">Alredy a User?</Link>
                </form>
            </div>
        <Footer/>
    </>
  )
}
