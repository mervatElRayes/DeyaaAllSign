import { React, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import Loading from "../components/Loading";
// kjkjkjkjkjkjkjkjkjkjkkj
import { useRef } from "react";
// import "./about.css";
import devAnimation from "../animations/dev.json";
import Lottie from "lottie-react";




// yuyuyuyuuuuuuuuuuuuuuuu
const Home = () => {
    const lottieRef = useRef();
  const [user, loading, error] = useAuthState(auth);

  // if use & not Verification
  // if use & Verification
  // if nonUser

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <>
        <Header />
        <main>
          <h1>
            please SignUp <Link to="/signup">Signup</Link>{" "}
          </h1>
        </main>
        <Footer />
      </>
    );
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
        <div>
          <Helmet>
            <title> Home page</title>
            <meta name="description" content="Home Page" />
          </Helmet>
          <Header />
          <main className="myHome">
          <div className="left-section mainHome" >
              <h1> Welcome: {user.displayName} </h1>
          </div>



        <div className="right-section animation">

          
          <Lottie
            lottieRef={lottieRef}
            onLoadedImages={() => {
              // @ts-ignore
              //https://lottiereact.com/
              lottieRef.current.setSpeed(0.8);
            }}
            animationData={devAnimation}
          />
        </div>
          </main>
          <Footer />
        </div>
      );
    }
  }
};

export default Home;
