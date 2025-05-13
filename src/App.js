import './App.css';
import click from "../src/assets/images/click.png"
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import "bootstrap/dist/css/bootstrap.css";
import Home from './components/Home';
import Products from './components/Products';
import Payment from './components/Payment';
import Cart from './components/Cart';
import Upload from './components/Upload';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>
            <span className="imgspan">
              <img src={click} alt="logo" className="headerimg" />
            </span>
            <b className="text-success">CLICK-CREW</b>
          </h1>
        </header>

        <nav>
          <Link to="/Signup" className="btn btn-outline-success mx-2 px-5">
            Signup
          </Link>
          <Link to="/Signin" className="btn btn-outline-dark mx-2 px-5">
            Signin
          </Link>
          <Link to="/products" className="btn btn-outline-dark mx-2 px-5">
            Buy
          </Link>
          <Link to="/Upload" className="btn btn-outline-dark mx-2 px-5">
            Upload Product
          </Link>
          <Link to="/" className="btn btn-outline-dark mx-2 px-5">
            Home
          </Link>
          <Link to="/cart" className="btn btn-outline-dark mx-2 px-5">
            Orders
          </Link>
        </nav>

        <Routes>
          <Route path="/signup" Component={Signup}></Route>
          <Route path="/signin" Component={Signin}></Route>
          <Route path="/" Component={Home}></Route>
          <Route path="/products" Component={Products}></Route>
          <Route path="/payment" Component={Payment}></Route>
          <Route path="/cart" Component={Cart}></Route>
          <Route path="/Upload" Component={Upload}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
