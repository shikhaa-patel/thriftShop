import { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails';
import Home from './pages/Home';
import Pagenotfound from './pages/Pagenotfound';
import LendBook from './pages/Lendbook';
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from './context/ProductContext';
import { ThemeProvider } from './context/ThemeContext';
import Transaction from './pages/Transaction';

function App() {
  const [appTheme, setAppTheme] = useState(localStorage.getItem('theme') || 'light')
  const toggleAppTheme = () => {
    if (appTheme === 'light') {
      setAppTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
    else {
      setAppTheme('light');
      localStorage.setItem('theme', 'light');
    }
  }
  const [myStyle, setMyStyle] = useState({ background: 'rgb(5 182 195)' })

  useEffect(() => {
    if (appTheme === 'dark') { setMyStyle({ background: '#050505' }) }
    else { setMyStyle({ background: 'rgb(5 182 195)' }) }
  }, [appTheme])

  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <ProductProvider>
              <Navbar theme={toggleAppTheme} />
              <div style={{ ...myStyle, minHeight: `calc(100vh - 4.5rem)`, padding: "1rem 0 0 0" }}>
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/login' element={<Login />} />
                  <Route exact path='/register' element={<Register />} />
                  <Route exact path='/product' element={<Product />} />
                  <Route exact path='/product/details' element={<ProductDetails />} />
                  <Route exact path='/lendbook' element={<LendBook />} />
                  <Route exact path='/contactus' element={<ContactUs />} />
                  <Route exact path='/profile' element={<Profile />} />
                  <Route exact path='/transaction' element={<Transaction />} />
                  <Route exact path='*' element={<Pagenotfound />} />
                </Routes>
              </div>
            </ProductProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
