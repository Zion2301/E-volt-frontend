import "./Main.css";
// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import img from "../assets/drone.avif";
import { Link } from "react-router-dom";
import drone from "../assets/drone-background.png"
import plane from "../assets/plane.avif"
import another_drone from "../assets/drone-ig.avif"
import Footer from "./Footer";

const Main = () => {
   
    return (
        <>
            {/* <section className="banner"> */}
                {/* <div className="inner-div">
                    <div className="inner-inner">
                        <h1 className="title">We Are here to Save the Day</h1>
                        <p className="more">
                            Juiced Up, Amped for Action, and Fully Charged to Shock the World!
                            Whether its power,<br></br> precision, or pure electrifying innovation, we’ve got
                            the voltage to keep things buzzing!
                        </p>
                    </div>
                </div> */}

                


            <section className="banner">
                <div className="inner-div">
                    <div className="tell-div">There are many applications of<br></br> UAV technology that might<br></br> 
                    surprise you</div>
                    <Link className="start">Get Started</Link>
                </div>
                
            </section>

            <section className="under-banner">

               <div className="pic-div">
               <img src={drone} alt="" className="giant"/>
               </div>
                <h1 className="edge">Drones Use Cutting Edge Technologies &<br></br>
                Products To Get The Best Results</h1>

                <p className="small-header">AERIAL PHOTOGRAPHY</p>

                <div className="div-background">
                    <div className="div-left">The big standout-feature here is the 2.5 mile range. That’s more than twice the <br></br> range of the X-Star Premium Drone! If you’re familiar with the Phantom 3 Pro, then you might be wondering<br></br> what the Phantom 3 SE is missing.</div>
                </div>
            </section>

            <section className="left-right">
                <div className="left-section">
               <span className="collect">Real-time Analysis Of The Collected Data</span>
               <p className="lower">Drone provides a quick means to gather information</p>
                </div>

                <div className="right-section">
                    <div className="inner-right">
                    <span className="collect">From Agriculture To Inspections</span>
                    <p className="lower">Agricultural use could comprise 80% of the market</p>
                    </div>
                </div>
            </section>


            <section className="final">
                <h1 className="edge">Innovative Streaming & Publishing</h1>
                <p className="div-left">Sprawling cities are great, but drone usage in film and TV is not limited to<br></br> ‘establishing’ shots anymore</p>

                <div className="last-div">
                    <img src={plane} alt="" className="tired" />
                    <img src={another_drone} alt="" className="tired" />
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default Main;
