import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

function reducer(state, action) {
    const newItem = action.payload;
    switch(action.type){

        case "ADD":
            console.log("in add");
            return [...state,{
                _id: newItem._id,
                name: newItem.name, 
                price: newItem.price,
                qty: newItem.qty,
                size: newItem.size
            }]

        case "REMOVE":
            console.log("in remove");
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;

        case "UPDATE":
            console.log("in update");
            let cartArr = [...state];
            cartArr.find((food, index)=>{
                if(food._id === newItem._id) {
                    console.log(`prev qty: ${food.qty}   new qty: ${newItem.qty}` );
                    cartArr[index] = {...food , qty: parseInt(newItem.qty) + food.qty, price: newItem.price + food.price }    
                }
                return cartArr;
            })
            return cartArr;
        
        case "DROP":
            console.log("in drop");
            return []
        default:
            console.log(action);
            return [...state, {name: "product not found"}]
    }

}


export function CartProvider( {children} ) {
    const [state, dispatch] = useReducer(reducer, []);
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider> 
        </CartDispatchContext.Provider>
    );
    
}

export const useCartState = ()=> useContext(CartStateContext);
export const useCartDispatch = ()=> useContext(CartDispatchContext);



