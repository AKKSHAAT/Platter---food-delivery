import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate} from "react-router-dom";

const URL = "http://localhost:5555/api/loginuser";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  function handlecChange(event) {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);

    if (!json.success) {
      if( typeof(json.errors) === "object" ) { alert(json.errors[0].msg) } 
      else { alert(json.errors) }
    } 
    if (json.success) {
      console.log("logged in");

      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/")
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container p-5 d-flex justify-content-between">
        <form onSubmit={handleSubmit} action="/signup" method="post" className="w-50">
          <legend>Login</legend>
          <div className="mb-3">
            <label htmlFor="InputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control w-75"
              id="InputEmail"
              name="email"
              value={credentials.email}
              onChange={handlecChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="InputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control w-75"
              id="InputPassword1"
              name="password"
              value={credentials.password}
              onChange={handlecChange}
            />
          </div>

          <button type="submit" className="mr-3 btn btn-danger">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-outline-danger">
            Create an Account
          </Link>
        </form>
        <div className="text-center" >
              <img className="rounded"  src="https://source.unsplash.com/random/500x250/?daal"/>
              <h1>Platter</h1>
        </div>
  
      </div>
      <Footer />
    </div>
  );
}
