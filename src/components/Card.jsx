import React from 'react'

export default function Card({food}) {

    const options = food.options[0];
    const priceOptions = Object.keys(options);
    // console.log(priceOptions);


    const imgStyle = {
        "height": "150px",
        "objectFit": "cover",
        "overflow": "hidden"
    }
  return (
    <div className="card mt-4 m-4" style={ {"width": "18rem", "maxHeight" : "300px"} }>
        <img src={food.img} className="card-img-top h-50" style={imgStyle} alt="..." />
        <div className="card-body">
            <h5 className="card-title">{food.name}</h5>
            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            <div className="container w-100">
                <select className="m-2 h-100 bg-danger rounded">
                    {Array.from( Array(6), (e, i)=>{
                        return (
                            <option key={i+1} value={i+1} > {i+1} </option>
                        )
                    } )}  
                </select>
                <select className="m-2 h-100 bg-danger rounded">
                {
                    priceOptions.map( data => <option key={data} value={data} >{data}</option> )
                }

                </select>
                <div className="d-inline fs-5">
                    Total Price
                </div>
            </div>
        </div>
    </div>
  )
}