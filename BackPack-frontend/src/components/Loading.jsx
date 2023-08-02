import React, { useContext } from 'react'
import { Player } from "@lottiefiles/react-lottie-player";
import loading from '../assets/loading/loading.json'
import ThemeContext from '../context/ThemeContext';
export default function Loading() {
  const {myStyle}=useContext(ThemeContext)
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:`calc(100vh - 4.5rem)`,...myStyle,margin:"-1rem 0 0 0"}}>
      <Player autoplay loop src={loading} style={{width:"15rem",height:'15rem'}}></Player>
    </div>
  )
}
