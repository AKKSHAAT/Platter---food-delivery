import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

// -------screens--------
import Home from "./screens/Home";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import MyOrder from "./screens/MyOrder";
import { CartProvider } from "./Contexts/ContextReducer";



function App() {
  return (
    <CartProvider>  
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={ <Home/> } />
            <Route exact path="/login" element={ <Login/> } />
            <Route exact path="/signup" element={ <Signup/> } />
            <Route exact path="/MyOrder" element={ <MyOrder/> } />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
