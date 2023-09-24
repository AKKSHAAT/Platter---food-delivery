import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const URL =""

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handlecChange(event) {
    setCredentials({ 
      ...credentials, 
      [event.target.name]: event.target.value });
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
    console.log(json);

    if (!json.success) {
      alert(json.errors[0].msg);
    } else {
      console.log("user Created");
    }
  };

  return (
    <div>
      <Navbar />
      Login
      <Footer />
    </div>
  );
}
