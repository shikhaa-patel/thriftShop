import React, { useContext } from "react";
import Hero from "../views/Hero";
import About from "../views/About";
import Testimonials from "../views/Testimonials";
import Footer from "../views/Footer";
import '../styles.css'
import ThemeContext from "../context/ThemeContext";

const Home = () => {
  const{myStyle}=useContext(ThemeContext)
  return (
    <div>
      <section >
        <Hero />
      </section>
      <section id="about" style={{...myStyle}}>
        <About />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="footer">
        <Footer/>
      </section>
    </div>
  );
};

export default Home;