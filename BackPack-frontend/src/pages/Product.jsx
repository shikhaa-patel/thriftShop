import React, { useState, useEffect, useContext } from 'react'
import AuthContext from "../context/AuthContext";
import ProductContext from '../context/ProductContext';
import ProductItem from '../components/ProductItem'
import Modal from 'react-bootstrap/Modal';
import '../App.css'
import ThemeContext from '../context/ThemeContext';
import Loading from '../components/Loading'

export default function Product() {
    const { checkUser, loading } = useContext(AuthContext)
    //eslint-disable-next-line
    useEffect(() => { checkUser() }, [])

    let { theme, myStyle, inputStyle } = useContext(ThemeContext)
    let { productsData, profileData } = useContext(ProductContext)

    //search feature
    const [searchQuery, setSearchQuery] = useState('')

    const handleClear = (e) => {
        const inputele = e.target.parentElement.parentElement.previousElementSibling
        inputele.value = ''
        setSearchQuery('')
    }

    //Modals function
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {/* Modal */}
            <Modal show={show} onHide={handleClose} style={{ backdropFilter: 'blur(2px)', overflow: 'visible' }}>
                <Modal.Header closeButton style={{ height: '3.5rem', ...inputStyle }}>
                    <Modal.Title style={{ textShadow: '1px 1px grey' }} className={`text-${theme === 'light' ? 'dark' : 'light'}`}>Send request for book</Modal.Title>
                </Modal.Header>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <Modal.Body style={{ padding: '1.5rem', ...inputStyle }}>
                        <div className="mb-3">
                            <label htmlFor="title" className={`form-label text-${theme === 'light' ? 'dark' : 'light'}`} style={{ textShadow: '1px 0px grey' }}>Title of Book</label>
                            <input type="text" className="form-control shadow-sm" id="title" style={{ ...myStyle }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="author" className={`form-label text-${theme === 'light' ? 'dark' : 'light'}`} style={{ textShadow: '1px 0px grey' }}>Author of Book</label>
                            <input type="text" className="form-control shadow-sm" id="author" style={{ ...myStyle }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="moreinfo" className={`form-label text-${theme === 'light' ? 'dark' : 'light'}`} style={{ textShadow: '1px 0px grey' }}>Additional information of Book</label>
                            <textarea className="form-control shadow-sm" id="moreinfo" style={{ height: 'calc(5rem + 3vw)', ...myStyle }} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ ...inputStyle }}>
                        <button className='btn btnBg shadow-sm align-items-center d-flex justify-content-center' onClick={handleClose} style={{ width: 'calc(4rem + 1vw)', height: 'calc(2rem + .2vw)' }}>
                            Close
                        </button>
                        <button className='btn btnBg shadow-sm align-items-center d-flex justify-content-center' onClick={handleClose} style={{ width: 'calc(4rem + 1vw)', height: 'calc(2rem + .2vw)' }}>
                            Submit
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
            {loading && <Loading />}
            {!loading &&
                <div style={{ ...myStyle, margin: 'calc(1rem + 2vw) calc(.1rem + 2vw) -1rem calc(.1rem + 2vw)', boxShadow: '0 0 15px grey', borderRadius: "5px" }}>
                    <div className="d-flex justify-content-center">
                        <div style={{ width: 'calc(10rem + 30vw)', position: 'relative' }}>
                            <input type="text" name="search" id="search" className='mb-2 mt-4' style={{ borderRadius: '20px', color: '#6a6a6a', width: '100%', border: "none", outline: 'none', borderBottom: "2px solid grey", boxShadow: "0 0 5px grey", fontSize: 'calc(1rem + .1vw)', padding: '.4rem 1.2rem', fontFamily: 'serif' }} placeholder='Search here' onChange={(e) => { setSearchQuery(e.target.value) }} />
                            <span style={{ position: "absolute", right: '.2vw', top: 'calc(1.4rem + .1vw)' }}><button className='btn shadow-none' onClick={handleClear} title='clear'><i className="fa-solid fa-xmark fa-lg"></i></button></span>
                        </div>
                    </div>
                    <div className="row">
                        {productsData.map((element, index) => {
                            if (element.current_owner.id !== (profileData.user ? profileData.user.id : '') && element.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                                return <div className="col-md-3 justify-content-center d-flex" style={{ margin: 'calc(1rem + .5vw) 0' }} key={index}>
                                    <ProductItem item={element} />
                                </div>
                            }
                        })}
                    </div>
                    <h6 className='mx-4 my-3 pb-3'>Could not find your book above ? <button className="btn btnBg btn-sm shadow-sm" style={{ marginTop: 'calc(.5rem - .5vw)' }} onClick={handleShow}>Let us know</button></h6>
                </div>
            }
        </>
    )
}