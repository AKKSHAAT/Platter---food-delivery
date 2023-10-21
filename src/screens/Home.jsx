import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card"

import Carousel from "../components/Carousel";
import { useEffect, useState } from "react";
export default function Home() {

    const [foodData, setFoodData] = useState([]);
    const [foodCategory, setFoodCategory] = useState([]);
    const [search, setSearch] = useState('');

    const loadData = async ()=>{
        let response = await fetch("http://localhost:5555/api/foodData",{
            method:"POST",
            headers: {
                "Content-Type": "application/json" 
            }
        });
        response = await response.json();
        // console.log(response[1]);
        setFoodCategory(response[1]);
        setFoodData(response[0]);
    }


    useEffect(()=>{
        loadData();
    })

    function handleSearch(e){
        setSearch(e.target.value);  
    }

    return (
        <div>
            <Navbar />

                <div>
                    <Carousel />
                </div>

                <div className="container-fluid  search bg-danger">
                    <div className="d-flex justify-content-center">
                        <input className="Search-input form-control me-3 w-100 text-white bg-danger" type="search" placeholder="Search" value={search} onChange={handleSearch}/>
                        {/* <button className="Search-input btn btn-outline-dark" type="submit">Search</button> */}
                    </div>
                </div>

                <div className="container">

                    {
                        foodCategory !=[]?
                        foodCategory.map((catogry)=>{
                            return(<div className="row">
                                    <h1 key={catogry._id} className="m-4">{catogry.CategoryName}</h1>
                                    <hr></hr>
                                        {
                                            foodData != []?
                                            foodData.filter( (food) => (food.CategoryName == catogry.CategoryName) && (food.name.toLowerCase().includes(search.toLowerCase())) ) 
                                            .map(food=> {
                                                    return(
                                                        <div  className="col-lg-4 col-12" style={{"textAlign": "center"}}>
                                                            <Card key={food._id} food={food}/> 
                                                        </div>
                                                    )
                                            })
                                            : <h2>catogry not found</h2>
                                        } 
                                    </div>
                                    )
                        })
                        :<div></div>
                    }
                </div>

            <Footer />
        </div>
    )
}