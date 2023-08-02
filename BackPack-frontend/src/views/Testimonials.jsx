import React, { useState, useEffect, useContext } from "react";
import '../styles.css'
import ThemeContext from "../context/ThemeContext";

const Testimonials = () => {
  const { theme } = useContext(ThemeContext)
  const [myStyle, setMyStyle] = useState({ background: 'rgb(5 182 195)', color: 'black' })
  useEffect(() => {
    if (theme === 'dark') { setMyStyle({ background: '#050505', color: 'rgb(245 245 245)' }) }
    else { setMyStyle({ background: 'rgb(5 182 195)', color: "black" }) }
  }, [theme])

  return (
    <div className="container-fluid px-0" style={{...myStyle}}>
      <div
        id="carouselExampleIndicators"
        className="carousel slide position-relative"
        data-bs-ride="true"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active mt-5"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            className="mt-5"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
            className="mt-5"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="text-center">
              <img src="https://media.istockphoto.com/id/1141737652/photo/portrait-of-a-confident-young-man.jpg?b=1&s=170667a&w=0&k=20&c=Y9fE0UrJiqEADUBx5ccBkExhSmnV5eyQ9kPMeGecGoM=" alt="" className="mt-5" style={{ width: "calc(10rem + 10vw)", height: "20%", borderRadius: '20px' }} />
              <p className="my-5" style={{position:'relative', margin: '0 1vw', fontSize: 'calc(.9rem + .7vw)', padding: '0 calc(1rem + 6vw)', fontFamily: "'Montserrat', sans-serif" }} >"I can't thank Backpack enough . They provided me books when I needed them the most, that too free.
                It also helped me to make new connections with the people pursuing same courses."
                <br />
                <span style={{fontSize:'calc(.8rem + .7vw)',fontStyle:"italic"}} className='auser'>- Vibhor Agrawal</span>
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <div className="text-center">
              <img src="https://media.istockphoto.com/id/1165322722/photo/young-indian-college-student-with-holding-file-in-hand.jpg?b=1&s=170667a&w=0&k=20&c=lIYMcoXCMa--SRhFEpJhcf38hPKJvxPVP_P_jx_2bQk=" alt="" className="mt-5" style={{ width: "calc(10rem + 10vw)", borderRadius: '20px' }} />
              <p className="my-5" style={{ position:'relative',margin: '0 1vw', fontSize: 'calc(.9rem + .7vw)', padding: '0 calc(1rem + 6vw)', fontFamily: "'Montserrat', sans-serif" }}>"A nice initiative taken for students especially like me who cannot afford expensive college text books . This site helped me to save my money and time and it is also very convenient"
              <br />
              <span style={{fontSize:'calc(.8rem + .7vw)',fontStyle:"italic"}} className='auser'>- Neeraj Kumar</span>
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <div className="text-center">
              <img src="https://media.istockphoto.com/id/1128932923/photo/confident-male-college-student-on-campus.jpg?b=1&s=170667a&w=0&k=20&c=dywu73Iw7YEVY0RjQvRTbGvFxs-Q_PiKnJjrIT5Jo1w=" alt="" className="mt-5" style={{ width: "calc(10rem + 10vw)", borderRadius: '20px' }} />
              <p className="my-5" style={{ position:'relative',margin: '0 1vw', fontSize: 'calc(.9rem + .7vw)', padding: '0 calc(1rem + 6vw)', fontFamily: "'Montserrat', sans-serif" }}>"I was unable to find a book during my examinations, at that time I found BackPack and not only I was able to find the book but also made a new connection with the person doing the same course"
              <br />
              <span style={{fontSize:'calc(.8rem + .7vw)',fontStyle:"italic"}} className='auser'>- Ujjwal Gupta</span>
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Testimonials;