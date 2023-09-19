import './App.css';
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProducts from './components/AddProducts';
import ProductList from './components/ProductList';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route element={<PrivateComponent/>}>
          <Route path='/' element={<ProductList/>}></Route>
          <Route path='/add-products' element={<AddProducts/>}></Route>
          {/* <Route path='/update' element={<h1>update component</h1>}></Route> */}
          <Route path='/logout' element={<h1>logout component</h1>}></Route>
          <Route path='/profile' element={<h1>Profile component</h1>}></Route>
          </Route>
          <Route path='/signUp' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>



        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
