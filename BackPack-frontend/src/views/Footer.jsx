import React from "react";
import '../App.css'

const Footer = () => {
  const myStyle = {
    background: 'rgb(0 33 33)',
    color:'white'
  }
  const handleScroll=()=>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  return (
    <>
      <div className="text-center mt-4 position-relative" style={{ ...myStyle,padding:'5rem 0' }}>
        <h2 style={{fontFamily:'Courgette',marginBottom:'1.5rem',color:'rgb(0 152 127)'}}>Backpack is here for you</h2>
        <div className="fs-4 my-4">
          <span className="footer-span"><i className="footer-icons fa-brands fa-facebook"></i></span>
          <span className="footer-span"><i className="footer-icons fa-brands fa-twitter"></i></span>
          <span className="footer-span" style={{padding:'calc(.5rem - .25vw) .6rem'}}><i className="footer-icons fa-brands fa-instagram"></i></span>
          <span className="footer-span"><i className="footer-icons fa-solid fa-envelope"></i></span>
        </div>
        <p style={{fontSize:'calc(.9rem + .1vw)'}}><a href="/" style={{textDecoration:'none',margin:"1rem",color:'#a1a1a1'}}>Terms & Conditions</a><span style={{color:"#a1a1a1"}}>Copyright &copy; 2023</span><a href="/" style={{textDecoration:'none',margin:"1rem",color:'#a1a1a1'}}>Privacy Policy</a></p>
        <span id="gototoparrow" onClick={handleScroll}><i className="fa-solid fa-arrow-up fs-5"></i></span>
      </div>
    </>
  );
};

export default Footer;