import React, { useContext, useState, useEffect } from 'react'
import '../App.css'
import Loading from '../components/Loading'
import ProductContext from '../context/ProductContext'
import ThemeContext from '../context/ThemeContext'
import AuthContext from '../context/AuthContext'
export default function LendBook() {
    const { checkUser, loading } = useContext(AuthContext)
    // eslint-disable-next-line
    useEffect(() => { checkUser() }, [])
    const { theme, myStyle, inputStyle } = useContext(ThemeContext)
    const formData = new FormData()
    const [details, setDetails] = useState({})
    const handleOnChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const { registerBook } = useContext(ProductContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        for (const ele in details) {
            formData.append(ele, details[ele])
        }
        registerBook(formData)
    }

    return (
        <>
            {loading && <Loading />}
            {!loading &&
                <div className="container" style={{ ...inputStyle, padding: 'calc(1rem + .5vw)' }}>
                    <div className="container" style={{ ...myStyle, padding: 'calc(1rem + 1vw)', boxShadow: "0 0 10px rgb(190, 190, 190)" }}>
                        <h2 style={{ fontFamily: 'serif', textAlign: 'center', marginBottom: "calc(2.5rem - 1vw)", fontWeight: "600" }}>Register your book &#128218;</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" style={{ fontSize: '1.2rem', marginBottom: ".5rem" }}>Name of book*</label>
                                <input type="text" name='name' className="form-control border-0 shadow-sm py-2" onChange={handleOnChange} required style={{ ...inputStyle }} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" style={{ fontSize: '1.2rem', marginBottom: ".5rem" }}>Description of book *</label>
                                <textarea type="text" name='description' className="form-control border-0 shadow-sm py-2" style={{ ...inputStyle, height: "7rem" }} onChange={handleOnChange} required />
                            </div>
                            <div className={`mb-4 shadow-sm p-3 text-${theme === 'light' ? 'dark' : ''}`} style={{ ...inputStyle }}>
                                <span>Photo 1 : * </span><label><span className='fileInpStyleBtn ms-1'><i className="fa-solid fa-upload me-1"></i>Upload Image</span><input type="file" name="photo1" className='fileInpBtn ms-2' onChange={(e) => { formData.append('photo1', e.target.files[0]) }} required /></label>
                            </div>
                            <div className={`mb-4 shadow-sm p-3 text-${theme === 'light' ? 'dark' : ''}`} style={{ ...inputStyle }}>
                                <span>Photo 2 : </span><label><span className='fileInpStyleBtn ms-3'><i className="fa-solid fa-upload me-1"></i>Upload Image</span><input type="file" name="photo2" className='fileInpBtn ms-2' onChange={(e) => { formData.append('photo2', e.target.files[0]) }} /></label>
                            </div>
                            <div className={`mb-4 shadow-sm p-3 text-${theme === 'light' ? 'dark' : ''}`} style={{ ...inputStyle }}>
                                <span>Photo 3 : </span><label><span className='fileInpStyleBtn ms-3'><i className="fa-solid fa-upload me-1"></i>Upload Image</span><input type="file" name="photo3" className='fileInpBtn ms-2' onChange={(e) => { formData.append('photo3', e.target.files[0]) }} /></label>
                            </div>
                            <div className={`mb-4 shadow-sm p-3 text-${theme === 'light' ? 'dark' : ''}`} style={{ ...inputStyle }}>
                                <span>Photo 4 : </span><label><span className='fileInpStyleBtn ms-3'><i className="fa-solid fa-upload me-1"></i>Upload Image</span><input type="file" name="photo4" className='fileInpBtn ms-2' onChange={(e) => { formData.append('photo4', e.target.files[0]) }} /></label>
                            </div>
                            <div className={`mb-4 shadow-sm p-3 text-${theme === 'light' ? 'dark' : ''}`} style={{ ...inputStyle }}>
                                <span>Photo 5 : </span><label><span className='fileInpStyleBtn ms-3'><i className="fa-solid fa-upload me-1"></i>Upload Image</span><input type="file" name="photo5" className='fileInpBtn ms-2' onChange={(e) => { formData.append('photo5', e.target.files[0]) }} /></label>
                            </div>
                            <button type="submit" className="btn shadow-sm btnBg" style={{ borderRadius: "20px", padding: "calc(.3rem + .2vw) calc(1.5rem + .5vw)", cursor: 'pointer' }}>Register Book</button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}
