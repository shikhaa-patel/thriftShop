import React, { useContext, useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import ThemeContext from "../context/ThemeContext";
import AuthContext from "../context/AuthContext";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import ProductContext from "../context/ProductContext";
import useAxios from "../utils/useAxios";
import { baseurl } from "../baseurl";
import Loading from "../components/Loading";

const Profile = () => {
  const { checkUser, loading, setLoading } = useContext(AuthContext)
  // eslint-disable-next-line
  useEffect(() => { checkUser() }, [])
  const api = useAxios()
  const { profileData, profile } = useContext(ProductContext)
  const capitalize = (str) => {
    return (str[0].toUpperCase() + str.slice(1))
  }
  const { theme, inputStyle } = useContext(ThemeContext)
  const [myStyle, setMyStyle] = useState({})
  const [inputMyStyle, setInputMyStyle] = useState({})
  useEffect(() => {
    if (theme === 'dark') {
      setMyStyle({ background: '#101010', color: 'rgb(245 245 245)' });
      setInputMyStyle({ background: '#202020', color: "white" })
    }
    else {
      setMyStyle({ background: 'rgb(240 240 245)', color: "black" });
      setInputMyStyle({ background: 'white', color: "black" })
    }
  }, [theme])

  const formData = new FormData()
  const handleAcceptReject = async (id, status) => {
    setPendingRequestsToMe(0)
    let url = baseurl + 'api/accept-or-reject-request/'
    formData.append('transaction', id)
    formData.append('status', status)
    setLoading(true)
    await api.put(url, formData)
    profile()
  }

  const [pendingRequestsToMe, setPendingRequestsToMe] = useState(0)
  const pendingRequestsToMeCounter = () => {
    let counter = 0;
    ((profileData.request_to_me) ? profileData.request_to_me : []).map((ele, index) => {
      if (ele.status === 'pending') { counter++ }
    })
    setPendingRequestsToMe(counter)
  }

  useEffect(() => {
    pendingRequestsToMeCounter()
  }, [profileData])

  const handleAvailability = async (id) => {
    const formData = new FormData()
    formData.append('product', id)
    let url = baseurl + 'api/products/'
    await api.put(url, formData)
    profile()
  }

  //Modals function
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Modal */}
      <Modal show={show} onHide={handleClose} style={{ backdropFilter: 'blur(2px)', overflow: 'visible' }}>
        <ModalHeader closeButton style={{ ...inputMyStyle, border: '1px solid white', borderBottom: 'none', letterSpacing: ".5px" }}><h3>All requests for your books</h3></ModalHeader>
        <Modal.Body style={{ padding: '1.5rem', ...inputMyStyle, border: "1px solid white", borderTop: 'none', letterSpacing: ".5px" }}>
          {pendingRequestsToMe === 0 && <p className="fs-5 fst-italic">No request now</p>}
          {
            ((profileData.request_to_me) ? profileData.request_to_me : []).map((ele, index) => {
              if (ele.status === 'pending') {
                return <div key={index} className="border border-light py-2 px-3 rounded mb-4" style={{ background: 'lightgrey' }}>
                  <h5>A new request for your "{ele.product.name}" book</h5>
                  <h6>Requesting User Details</h6>
                  <p className="p-0 m-0">Name : {ele.toOwner.first_name} {ele.toOwner.last_name}</p>
                  <p className="p-0 m-0">Username: {ele.toOwner.username}</p>
                  <p className="p-0 m-0">Batch : {ele.toOwner.batch}</p>
                  <p className="p-0 m-0">Email : {ele.toOwner.email}</p>
                  <p className="p-0 m-0">Address : {ele.toOwner.address}</p>
                  <div className="d-flex justify-content-end">
                    <button className='btn btn-success shadow-sm me-2' onClick={() => { handleClose(); handleAcceptReject(ele.id, 'accepted'); }}>Accept</button>
                    <button className='btn btn-danger shadow-sm' onClick={() => { handleClose(); handleAcceptReject(ele.id, 'rejected'); }}>Decline</button>
                  </div>
                </div>
              }
            })
          }
        </Modal.Body>
      </Modal>

      {(loading || Object.keys(profileData).length === 0) && <Loading />}
      {(!loading && Object.keys(profileData).length !== 0) &&
        <div style={{ ...myStyle, padding: '2rem 2rem', height: 'calc(100vh - 4.5rem)',marginTop:'-1rem'}}>
          <div className="row w-100 mx-0">
            <div className={`col-md-4 ${window.screen.width > 992 ? 'd-flex justify-content-center' : ''}`} style={{ ...inputMyStyle, borderRadius: "10px" }}>
              <div style={{ minWidth: "calc(10rem + 10vw)", paddingTop: "1rem" }}>
                <img src={profileData.user ? profileData.user.profile_pic : ''} alt="" width={120} height={110} style={{ borderRadius: "10px", background: 'rgb(200 200 200)' }} />
                <h4 className="mt-4">
                  {profileData.user ? capitalize(profileData.user.first_name) : ''}  {profileData.user ? capitalize(profileData.user.last_name) : ''}
                </h4>
                <h6 className="mt-2">@{profileData.user ? profileData.user.username : ''}</h6>
                <h6 className="mt-2 mb-3">{profileData.user ? profileData.user.email : ''}</h6>
                <hr />
                <h4 className="mt-3">About</h4>
                <ul className="list-group" style={{ fontFamily: "Roboto Slab" }}>
                  <li className="list-group-item mt-2 p-0" style={{ ...inputMyStyle, border: 'none', letterSpacing: ".5px" }}>College</li>
                  <li className="list-group-item mt-1 p-0 fw-bold" style={{ ...inputMyStyle, border: 'none', letterSpacing: ".5px" }}>{profileData.user ? profileData.user.college : ''}</li>
                  <li className="list-group-item mt-3 p-0" style={{ ...inputMyStyle, border: 'none', letterSpacing: ".5px" }}>Batch</li>
                  <li className="list-group-item mt-1 p-0 fw-bold" style={{ ...inputMyStyle, border: 'none', letterSpacing: ".5px" }}>{profileData.user ? profileData.user.batch : ''}</li>
                  <li className="list-group-item mt-3 p-0" style={{ ...inputMyStyle, border: 'none', letterSpacing: ".5px" }}>Address</li>
                  <li className="list-group-item mt-1 p-0 fw-bold" style={{ ...inputMyStyle, border: 'none', letterSpacing: ".5px" }}>{profileData.user ? profileData.user.address : ''}</li>
                  <li className="list-group-item mt-3 p-0" style={{ ...inputMyStyle, border: 'none', letterSpacing: ".5px" }}>Mobile</li>
                  <li className="list-group-item mt-1 p-0 fw-bold mb-4" style={{ ...inputMyStyle, border: 'none', letterSpacing: ".5px" }}>{profileData.user ? profileData.user.phone : ''}</li>
                </ul>
              </div>
            </div>
            <div className="col-md-8 px-0 px-md-3">
              <div>
                <button className="btn shadow-none" onClick={handleShow} style={{ position: "fixed", bottom: 'calc(3rem + 1vw)', right: 'calc(1rem + 1vw)', backgroundColor: "orange", fontWeight: '500', color: '#404040' }} >New Requests {pendingRequestsToMe !== 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {pendingRequestsToMe}
                </span>}</button>

                <div>
                  <div className="p-3 mx-1" style={{ marginTop: 'calc(2rem - 2vw)', ...inputMyStyle, borderRadius: "10px" }}>
                    <h2>Your Books</h2>
                    <div className="row">
                      {profileData.product.length === 0 && <p className="fs-5 fst-italic">No books show</p>}
                      {profileData.product.map((ele, index) => {
                        return <div className="col-md-3 my-3 d-flex justify-content-center" key={index}>
                          <div style={{ borderRadius: "10px", boxShadow: `0 0 7px 0px` }}>
                            <img src={ele.photo1} alt="" style={{ width: 'calc(15rem - 3vw)', height: 'calc(13rem - 3vw)', borderTopLeftRadius: "10px", borderTopRightRadius: '10px' }} />
                            <h5 className="text-center py-1">{capitalize(ele.name)}</h5>
                            <h6 className="text-center mt-2">
                              <span>Set Availability : </span>
                              <button disabled={ele.available === true ? true : false} style={{ border: `${ele.available === true ? `2px solid ${theme === 'light' ? '#181818' : 'white'}` : 'none'}`, background: "green", borderRadius: "50%", padding: '0px 7px', margin: '0 .3rem' }} onClick={() => { handleAvailability(ele.id) }}>&nbsp;</button>
                              <button disabled={ele.available === false ? true : false} style={{ border: `${ele.available === false ? `2px solid ${theme === 'light' ? '#181818' : 'white'}` : 'none'}`, background: "red", borderRadius: "50%", padding: '0px 7px' }} onClick={() => { handleAvailability(ele.id) }}>&nbsp;</button>
                            </h6>
                          </div>
                        </div>
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Profile;