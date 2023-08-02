import React, { useState, useEffect, useContext } from 'react'
import AuthContext from "../context/AuthContext";
import ProductContext from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import available from '../assets/images/availablestatus/available.png'
import notavailable from '../assets/images/availablestatus/notavailable.png'
import ThemeContext from '../context/ThemeContext';

export default function ProductItem(props) {
    const product = props.item
    const navigate = useNavigate()
    const { checkUser } = useContext(AuthContext)
    useEffect(() => { checkUser() }, [])
    const capitalize=(str)=>{
        return (str[0].toUpperCase() + str.slice(1))
    }
    let { productdetails,productsData } = useContext(ProductContext)

    const [data, setData] = useState()
    useEffect(() => {
        setData(productsData.filter((ele)=>(ele.id===product.id))[0])
    }, [])

    const handleClick = () => {
        navigate('/product/details', {
            state: { object: data }
        })
    }

    //dark mode
    const { theme, toggleTheme } = useContext(ThemeContext)
    const [myStyle, setMyStyle] = useState({
        background: 'white',
        color: '#181818',
    })

    const [inputStyle, setInputStyle] = useState({})

    useEffect(() => {
        if (theme === 'dark') {
            setMyStyle({
                background: '#404040',
                color: 'white'
            })
        }
        else {
            setMyStyle({
                background: 'white',
                color: 'black'
            })
        }
    }, [theme])

    return (
        <>
            <div className="card" style={{ width: '18rem', border: '3px outset whitesmoke', boxShadow: '0 0 5px grey', ...myStyle }}>
                <img src={product.photo1?product.photo1:''} className="card-img-top" alt="..." style={{ height: 'calc(15rem + 2vw)' }} />
                <div className="card-body">
                    <div className="row">
                        <h5 className="card-title col" style={{ fontFamily: 'Roboto Slab' }}>{product.name?capitalize(product.name):''}</h5>
                        <img className='col-2' src={product.available ? available : notavailable} alt={product.available?(product.available ? 'available' : 'not available'):''} style={{ width: 'calc(3rem + .5vw)', height: "calc(1.5rem + .5vw)" }} />
                    </div>
                    <button onClick={handleClick} className="btn btn-sm rounded mt-2 shadow-sm btnBg" style={{ fontFamily: "Roboto Slab" }}>More Details</button>
                </div>
            </div>
        </>
    )
}