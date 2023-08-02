import React, { useEffect, useState } from 'react'

export default function TransactionItem(props) {
    const ele=props.ele
    const owner=props.owner
    const capitalize=(str)=>{
        return (str[0].toUpperCase() + str.slice(1))
    }
    const [myColor,setMyColor]=useState({color:"black"})
    useEffect(()=>{
        if(ele.status==='accepted'){
            setMyColor({color:"#009900"})
        }
        else if(ele.status==='pending'){
            setMyColor({color:'rgb(206 206 5)'})
        }
        else{
            setMyColor({color:'red'})
        }
    },[])
    return (
        <>
            <div className={`col-${window.screen.width > 990 ? 3 : 6}`}>
                <img src={ele.product.photo1} alt="" width={130} height={125} style={{ marginBottom: '1rem' }} />
            </div>
            <div className={`col-${window.screen.width > 990 ? 4 : 6}`}>
                <h5>{ele.product.name}</h5>
                <h6 className='mb-3'>Status : <span style={{...myColor}}>{ele.status}</span></h6>
            </div>
            <div className='col-lg-5'>
                <h6>{props.ownerType} Details</h6>
                <p className="p-0 m-0">Name : {capitalize(owner.first_name)} {capitalize(owner.last_name)}</p>
                <p className="p-0 m-0">Username: {owner.username}</p>
                <p className="p-0 m-0">Batch : {owner.batch}</p>
                <p className="p-0 m-0">Email : {owner.email}</p>
                <p className="p-0 m-0">Address : {owner.address}</p>
            </div>
        </>
    )           
}
