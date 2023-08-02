import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../baseurl";
import useAxios from "../utils/useAxios";
import AuthContext from "./AuthContext";
const ProductContext = createContext()
export default ProductContext;
export const ProductProvider = ({ children }) => {
    const navigate = useNavigate()
    const { loading, setLoading, authTokens } = useContext(AuthContext)
    const api = useAxios()
    const [productsData, setProductsData] = useState([])
    const getallproducts = async () => {
        setLoading(true)
        try {
            let url = baseurl + 'api/products/';
            const response = await api.get(url);
            setProductsData(response.data)
        }
        catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const registerBook = async (details) => {
        setLoading(true)
        let url = baseurl + 'api/products/'
        try {
            const response = await api.post(url, details)
            navigate('/profile')
            getallproducts()
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false)
    }

    const productdetails = async (id) => {
        setLoading(true)
        let url = baseurl + `api/products/?id=${id}`
        try {
            const response = await api.get(url)
            setLoading(false)
            return response
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false)
    }

    const [profileData, setProfileData] = useState({})
    const profile = async () => {
        setLoading(true)
        let url = baseurl + 'api/profile/'
        try {
            const response = await api.get(url)
            setProfileData(response.data)
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false)
    }

    useEffect(() => {
        profile()
        getallproducts()
    }, [authTokens])

    const contextData = {
        getallproducts,
        productdetails,
        profile,
        profileData,
        setProfileData,
        productsData,
        setProductsData,
        registerBook
    }

    return (
        <ProductContext.Provider value={contextData}>
            {children}
        </ProductContext.Provider>
    )
}