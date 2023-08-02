import React from "react";
import booksharing from "../assets/images/home/maa2.png";
import book from "../assets/images/home/online.png";
import maa from "../assets/images/home/maa3.png"

const About = () => {
  return (
    <div>
      <div className="container py-4">
        <div className="row py-4 ">
          <div className="col-md-6 align-items-center d-flex" style={{padding:'0 calc(2.5rem)'}}>
            <div >
              <h3>The college community is here <br/>to help</h3>
              <p className="mt-4 fs-5 opacity-75">
               Be the part of a sharing college community which<br/>helps each other through books
              </p>
            </div>
          </div>
          <div className="col-md-6" style={{padding:'0 2.5vw'}}>
            <img src={booksharing} style={{ width: "100%",height:'20rem'}} alt=''/>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row py-4">
          <div className="col-md-6" style={{padding:'0 2.5vw'}}>
            <img
              src={book}
              alt=""
              style={{ width: "100%",height:'20rem'}}
            />
          </div>
          <div className="col-md-6 order-first order-md-last align-items-center d-flex justify-content-end" style={{padding:'0 calc(2.5rem)'}}>
            <div >
            <h3>A decentralised library<br/> for everyone</h3>
            <p className="mt-4 fs-5 opacity-75" >
            Find your favourite books from comfort of your<br/> home without spending any money .<br/>
            </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container pb-4">
        <div className="row py-4 ">
          <div className="col-md-6 align-items-center d-flex"  style={{padding:'0 calc(2.5rem)'}}>
            <div>
            <h3>Join and help others <br/>like you</h3>
            <p className="mt-4 fs-5 opacity-75">Come on and create an account to join <br/>us so you can also serve as a part of this initiative</p>
            </div>
          </div>
          <div className="col-md-6" style={{padding:'0 2.5vw'}}>
            <img src={maa} alt="" style={{width : "100%",height:'20rem'}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;