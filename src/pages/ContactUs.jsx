import { useEffect } from "react";
import "./contactus.css";
import { useForm, ValidationError } from "@formspree/react";
import Lottie from "lottie-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";


import contactAnimation from "../animations/contact.json";

const ContactUs = () => {
  const [state, handleSubmit] = useForm("xoqoybjl");
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
        <div>
          <Helmet>
            <title> Contactus page</title>

            <meta name="description" content="Contactus Page" />
          </Helmet>
          <Header />
          <main>
            <div
              style={{
                justifyContent: "space-between",
                width: "90%",
              }}
              className="flex"
            >
          <form style={{ width: "45%"}} onSubmit={handleSubmit} className="contactForm border">
          <div className="flex myForm">
            <label htmlFor="email">   <h3>Email Address:</h3> </label>
            <input
            style={{width: "50%" , height: "38px" , zIndex: "999"}}
            className="emailContact"
              autoComplete="off"
              required
              type="email"
              name="email"
              id="email"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
  
          <div className="flex myForm" style={{ marginTop: "24px" , position: "relative"}}>
            <label htmlFor="message">  <h3>Your massege:</h3>  </label>
            <textarea required name="message" id="message" style={{width: "50%" , height: "110px"}}></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          <button type="submit" disabled={state.submitting} className="submit">
            {state.submitting ? "Submitting ..." : "Submit"}
          </button>

          {state.succeeded && (
            <p
            className="messageDone"
              style={{ display: "flex", fontSize: "16px", marginTop: "1.7rem" }}
            >

        



        
              {('Your message has been sent successfully')} 👌
            </p>
          
          )}
          </form> 
<div className="halflottie">
  
                  {/* <Lottie
                  loop={false}
                  style={{ height: "33px" }}
                  animationData={doneAnimation}
                /> */}
  
                <div className="animation">
                  <Lottie
                    className="contact-animation"
                    style={{ height: "355px", backgroundColor: "transparent" }}
                    animationData={contactAnimation}
                  />
                </div>
</div>
            </div>
          </main>
          <Footer />
        </div>
      );
    }
  }
};

export default ContactUs;
