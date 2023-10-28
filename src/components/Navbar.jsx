import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { useCartState } from "../Contexts/ContextReducer";
import Cart from "./Cart";

export default function Navbar() {

  const cartState = useCartState();
  const cartDataLen = Object.keys(cartState).length ;
  const navigate = useNavigate();
  const [cartView, setcartView] = useState(false);
  

  function handleLogout(){
    localStorage.removeItem('authToken');
    navigate('/login');
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger " >
        <div className="container-fluid">
                    {/* home link */}
          <Link className="navbar-brand ml-5 fs-2" to="/"> <h1>Platter</h1> </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

            {localStorage.getItem('authToken')?
                <>
                  <div className="btn btn-warning text-white" onClick={()=> setcartView(true) }>
                        Cart {"  "}
                        <Badge pill bg="white" text="danger"> {cartDataLen} </Badge>
                  </div>

                  {cartView? <Modal onClose={()=>setcartView(false) }> <Cart/> </Modal> :null}
                </>
                :<div className="navbar-nav">  
                  <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                  <Link className="nav-link active" to="/signup">Sign up</Link>
                </div> 
            }

          </div>

          {
            localStorage.getItem('authToken')?
              <>
                <div className="navbar-nav m-2">  
                    <Link className="btn btn-outline-dark" aria-current="page" to="/MyOrder">My orders</Link>
                </div>  
                <div className="btn btn-outline-dark m-2" onClick={handleLogout}>  
                    Logout
                </div>  
              </>
            :<></>
          }
        </div>
      </nav>
    </div>
  );
}
