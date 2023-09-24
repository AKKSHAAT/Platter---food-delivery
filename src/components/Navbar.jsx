import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger " >
        <div className="container-fluid">
          <Link className="navbar-brand ml-5 fs-2" to="/"> <h1>Platter</h1> </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">  
              <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
              <Link className="nav-link active" to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
