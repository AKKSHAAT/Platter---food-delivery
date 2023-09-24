import React from 'react'

export default function Card() {
  return (
    <div className="card mt-4 m-4" style={ {"width": "18rem", "maxHeight" : "360px"} }>
        <img src="https://source.unsplash.com/random/300x150/?latte" className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <div className="container w-100">
                <select className="m-2 h-100 bg-danger rounded">
                    {Array.from( Array(6), (e, i)=>{
                        return (
                            <option key={i+1} value={i+1} > {i+1} </option>
                        )
                    } )}  
                </select>
                <select className="m-2 h-100 bg-danger rounded">
                    <option key={1} value={"half"} > half</option>
                    <option key={2} value={"full"} > full</option>
                </select>
                <div className="d-inline fs-5">
                    Total Price
                </div>
            </div>
        </div>
    </div>
  )
}
