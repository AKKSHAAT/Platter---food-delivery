import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MyOrder() {

    const [orderData, setorderData] = useState([])

    const fetchMyOrder = async () => {
        // console.log(localStorage.getItem('userEmail'));
        
        await fetch("http://localhost:5555/api/myOrder", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        })
        .then(async (res) => {
            let response = await res.json()
            .then(response=>{
                setorderData(response);
            })

        })
    }

    useEffect(() => {
        fetchMyOrder()
    }, []);

    return (
        <>
            <Navbar />
                <div>
                    { typeof(orderData) !== 'undefined' && orderData !== null ?
                        
                        <div>
                        {orderData.reverse().map((order, index) => {
                            return (
                                <div key={index}>
                                    { 'message' in order ? (
                                        <h1>{order.message}</h1>
                                    ) 
                                    : 
                                    (<div className='card m-5 w-50'>
                                        <div className='card-body'>
                                            <h2 className='card-title'>{order.name}</h2>
                                            <div className='card-text'>
                                                <p>qty: {order.qty}</p>
                                                <p>size: {order.size}</p>
                                                <p>size: {order.price}</p>
                                                <hr></hr>
                                                { Object.keys(order).includes('Order_date')?
                                                <p>date : {order.Order_date}</p>
                                                : <></>
                                                }
                                            </div>
                                        </div>
                                    </div> 
                                    )}
                                </div>
                            );
                        })}
                        </div>
                        :
                        <h1>Plese wait..</h1>
                    }
                </div>
            <Footer />
        </>
    )
}



