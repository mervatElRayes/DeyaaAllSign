import { React, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import './about.css'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
// ;;;;;;;;;;;;;
import { useState } from "react";

import { myProjects } from "./myProject";
import { AnimatePresence, motion } from "framer-motion";
// oooooooooooooo


const About = () => {
  // hghghggggg
  const [currentActive, setcurrentActive] = useState("all");
  const [arr, setArr] = useState(myProjects);
  
  const handleClick = (buttonCategory) => {
    setcurrentActive(buttonCategory);
    const newArr = myProjects.filter((item) => {
      const zzz = item.category.find((myItem) => {
        return myItem === buttonCategory;
      });

      return zzz === buttonCategory;
    });

    setArr(newArr);
  };




  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  if (loading) {
    return <Loading />;
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Header />
          <main>
            <h1>you not verify your email</h1>
          </main>
          <Footer />
        </>
      );
    }




    

    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title> About page</title>
            <meta name="description" content="About Page" />
          </Helmet>
          <Header />
          <main>
    


   <div className="container">
    
           <main className="flex">
              <section className="flex left-section">
                <button
                            onClick={() => {
                              setcurrentActive("all");
                              setArr(myProjects);
                            }}
                            className={currentActive === "all" ? "active" : null}>
                                 {("all Pojects")}
                </button>

                <button
                            onClick={() => {
                              handleClick("css");
                            }}
                            className={currentActive === "css" ? "active" : null}>
                            HTML & CSS
                </button>

                <button
                      onClick={() => {
                        handleClick("react");
                      }}
                      className={currentActive === "react" ? "active" : null} >
                      React & MUI
                </button>

                <button
                      onClick={() => {
                        handleClick("java");
                      }}
                      className={currentActive === "java" ? "active" : null}>
                      Java Script
                </button>

                <button
                      onClick={() => {
                        handleClick("node");
                      }}
                      className={currentActive === "node" ? "active" : null}>
                      Node & Express
                </button>
               </section>


              <section className="flex right-section">
                <AnimatePresence>
                  {arr.map((item) => {
                    return (
                      <motion.article
                        layout
                        initial={{ transform: "scale(0)" }}
                        animate={{ transform: "scale(1)" }}
                        transition={{ type: "spring", damping: 14, stiffness: 50 }}
                        key={item.imgPath}
                        className="card"
                      >
                        <img width={160} src={item.imgPath} alt="" />

                        <div style={{ width: "160px" }} className="box">
                          <h1 className="title">{item.projectTitle}</h1>
                          <p className="sub-title">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Architecto culpa eius saepe suscipit id nam eligendi
                            doloremque voluptate, debitis aliquid!
                          </p>
                          <div className="allIcons">
                            
                              <div className="fa-solid fa-link"></div>
                              <div className="fa-brands fa-github"></div>
                              <div className="miniIcon">
                              <a className="link flex" href="">
                                    {("more")}
                                    <i class="fa-solid fa-arrow-right"></i>
                                    <span
                                      style={{ alignSelf: "end" }}
                                      
                                    ></span>
                            
                              </a>
                            </div>
                            


                        
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </section>

        
           </main>
  
    </div>










            
          </main>
          <Footer />
        </>
      );
    }
  }











};

export default About;
