import React, { useEffect, useRef, useState } from 'react'
import { useCartState, useCartDispatch } from '../Contexts/ContextReducer';

export default function Card({food}) {

    const dispatch = useCartDispatch();

    const options = food.options[0];
    const sizeOptions = Object.keys(options);
    const priceRef = useRef();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('');

    const data = useCartState();
    const finalPrice = qty * parseInt(options[size]);

    const handleAddToCart = async () => {
        let repeatedFood = [];

        for(let dish of data){
            // console.log("dish: "+ typeof(dish.id));
            // console.log("food: " + typeof(food._id));
            if(dish._id === food._id) {
                console.log(food._id)
                console.log(dish._id)
                console.log("id is same")
                repeatedFood = dish;
                break;
            }
        }

        if(repeatedFood!=[]) {
            if(repeatedFood.size == size) {
                dispatch({type:"UPDATE", payload: {
                    _id: food._id,
                    price: finalPrice,
                    qty: qty,
                }})
            }
            else if(repeatedFood.size !== size) {
                dispatch({type:"ADD", payload: {
                    _id: food._id,
                    name: food.name,
                    price: finalPrice,
                    qty: qty,
                    size: size }
                }); 
                return;       
            }
        }
        return;
        dispatch({type:"ADD", payload: {
            _id: food._id,
            name: food.name,
            price: finalPrice,
            qty: qty,
            size: size }
        });
        // console.log(data);
        
    }
    

    const imgStyle = {
        "height": "150px",
        "objectFit": "cover",
        "overflow": "hidden"
    }

    useEffect(()=>{
        console.log(priceRef.current.value);
        setSize(priceRef.current.value);
    },[])

  return (
    <div className="card mt-4 m-4" style={ {"width": "18rem", "maxHeight" : "300px"} }>
        <img src={food.img} className="card-img-top h-50" style={imgStyle} alt="..." />
        <div className="card-body">
            <h5 className="card-title">{food.name}</h5>
            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            <div className="container w-100">
                <select className="m-2 h-100 bg-danger rounded" onChange={(e) => setQty(e.target.value)}>
                    {Array.from( Array(6), (e, i)=>{
                        return (
                            <option key={i+1} value={i+1} > {i+1} </option>
                        )
                    } )}  
                </select>
                <select className="m-2 h-100 bg-danger rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {
                 sizeOptions.map( data => <option key={data} value={data} >{data}</option> )
                }

                </select>
                <div className="d-inline fs-5">
                    ₹{finalPrice}-/
                </div>

                <hr></hr>
                <button className={'btn btn-danger justify-center ms-2'} onClick={handleAddToCart} >Add to cart</button>
            </div>
        </div>
    </div>
  )
}
