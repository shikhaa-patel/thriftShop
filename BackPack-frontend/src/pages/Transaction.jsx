import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import ThemeContext from '../context/ThemeContext'
import ProductContext from '../context/ProductContext'
import '../App.css'
import TransactionItem from '../components/TransactionItem'
import Loading from '../components/Loading'

export default function Transaction() {
  const { checkUser } = useContext(AuthContext)
  //eslint-disable-next-line
  useEffect(() => { checkUser() },[])
  const { myStyle, theme } = useContext(ThemeContext)
  const { loading } = useContext(AuthContext)
  const { profileData } = useContext(ProductContext)
  const [filterQuery, setFilterQuery] = useState('')
  const [requestUser, setRequestUser] = useState('request_to_me')

  const [myStyle2, setMyStyle2] = useState({
    background: 'rgb(210 230 230)',
    color: '#181818',
  })
  const [inputStyle2, setInputStyle2] = useState({
    background: 'rgb(220 220 220)',
    color: '#181818',
  })

  useEffect(() => {
    if (theme === 'dark') {
      setMyStyle2({
        background: '#252525',
        color: 'white'
      })
      setInputStyle2({
        background: '#404040',
        color: 'white'
      })
    }
    else {
      setMyStyle2({
        background: 'rgb(210 230 230)',
        color: 'black'
      })
      setInputStyle2({
        background: 'rgb(220 220 220)',
        color: 'black'
      })
    }
  }, [theme])

  return (
    <>
      {(loading || Object.keys(profileData).length === 0) && <Loading />}
      {(!loading && Object.keys(profileData).length !== 0) &&
        <div className='container p-3' style={{ ...myStyle, borderRadius: "10px" }}>
          <div className='container p-1' style={{ borderRadius: "10px",...myStyle2 }}>
            <div className="text-center mb-3"><h3>{requestUser === 'request_to_me' ? 'Requests to me' : 'My requests'}</h3></div>
            <div className="row" style={{borderRadius:"10px"}}>
              <div className={`${window.screen.width > 990 ? 'col-lg-3 d-flex align-items-center' : 'd-none'} text-${theme === 'light' ? 'dark' : 'light'}`}></div>
              <div className='col-lg-6 d-flex justify-content-center py-2'>
                <button className='transactionNavbarBtn px-4' onClick={() => { setFilterQuery('') }} style={{ border: `${filterQuery === '' ? '3px inset' : '3px outset'}` }}>All</button>
                <button className='transactionNavbarBtn' onClick={() => { setFilterQuery('accepted') }} style={{ border: `${filterQuery === 'accepted' ? '3px inset' : '3px outset'}` }}>Accepted</button>
                <button className='transactionNavbarBtn' onClick={() => { setFilterQuery('rejected') }} style={{ border: `${filterQuery === 'rejected' ? '3px inset' : '3px outset'}` }}>Rejected</button>
                {requestUser === 'my_request' && <button className='transactionNavbarBtn' onClick={() => { setFilterQuery('pending') }} style={{ border: `${filterQuery === 'pending' ? '3px inset' : '3px outset'}` }}>Pending</button>}
              </div>
              <div className='col-lg-3 d-flex justify-content-center my-3'>
                <select name="" id="college" style={{ cursor: 'pointer', padding: ".4rem .8rem", border: '1px solid black', borderRadius: "5px" }} onChange={(e) => { setRequestUser(e.target.value) }}>
                  <option value="request_to_me" style={{ fontFamily: "serif" }}>Requests to me</option>
                  <option value="my_request" style={{ fontFamily: "serif" }}>My requests</option>
                </select>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div style={{ width: 'calc(10rem + 35vw)' }}>
              {(requestUser === 'request_to_me') && ((profileData.request_to_me) ? profileData.request_to_me : []).map((ele, index) => {
                if ((ele.status === filterQuery || filterQuery === '') && ele.status !== 'pending') {
                  return <div key={index} className={`row my-4 p-2 text-${theme === 'light' ? 'dark' : 'light'}`} style={{ ...inputStyle2, borderRadius: "10px", boxShadow: '0 0 8px #909090' }}>
                    <TransactionItem ele={ele} ownerType={'Requesting User'} owner={ele.toOwner} />
                  </div>
                }
              })}
              {(requestUser === 'my_request') && ((profileData.my_request) ? profileData.my_request : []).map((ele, index) => {
                if ((ele.status === filterQuery || filterQuery === '')) {
                  return <div key={index} className={`row my-4 p-2 text-${theme === 'light' ? 'dark' : 'light'}`} style={{ ...inputStyle2, borderRadius: "10px", boxShadow: '0 0 8px #909090' }}>
                    <TransactionItem ele={ele} ownerType={'Book Owner'} owner={ele.fromOwner} />
                  </div>
                }
              })}
            </div>
          </div>
        </div>
      }
    </>
  )
}
