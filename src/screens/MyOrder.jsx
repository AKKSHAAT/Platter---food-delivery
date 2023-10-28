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
                    { typeof(orderData) != 'string' ? 
                        <div className='card'>
                            {orderData.reverse().map( (order, index) => {
                                return(
                                    <div key={index} className='card-body'>
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

                                )
                            } )}
                        </div>
                        : <h1>{orderData}</h1>
                    }
                </div>
            <Footer />
        </>
    )
}
