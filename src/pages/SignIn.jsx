import { React, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import "./signIn-signup.css";
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [FirebaseError, setFirebaseError] = useState("");
  const [forgotPassword, setforgotPassword] = useState("");

  return (
    <div>
      <Helmet>
        <title> Sign in page</title>
        <meta name="description" content="sign in Page" />
      </Helmet>
      <Header />
      <main>
        <form className={`Forgotpassword ${forgotPassword}`}>
          <i
            onClick={() => {
              setforgotPassword("hide-showForm");
            }}
            className="fa-solid fa-xmark"
          ></i>
          <input type="password" placeholder="change Password" />

          <button
            onClick={(eo) => {
              eo.preventDefault();
              sendPasswordResetEmail(auth, email)
                .then(() => {
                  // Password reset email sent!
                  console.log("Password reset email sent!");
                  // ..
                  navigate("/")
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorMessage);
                  // ..
                });
            }}
          >
            Set Password
          </button>
        </form>

        <form>
          <input
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
            type="email"
            placeholder="type your Email"
          />
          <input
            onChange={(eo) => {
              setpassword(eo.target.value);
            }}
            type="password"
            placeholder="type Password"
          />
          <button
            onClick={(eo) => {
              eo.preventDefault();
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  navigate("/");
                  console.log(user);
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  seterror(true);
                  setFirebaseError(errorMessage);

                  switch (error.code) {
                    case "auth/invalid-email":
                      setFirebaseError("Wrong Email");
                      break;

                    case "auth/wrong-password":
                    case "auth/invalid-login-credentials":
                      setFirebaseError("Wrong password");
                      break;

                    case "auth/invalid-credential":
                    case "user-not-found":
                      setFirebaseError("Check your email and password");

                      break;
                    default:
                      setFirebaseError(errorCode);
                  }
                });
            }}
          >
            Sign In
          </button>
          {error && <h5> {FirebaseError} </h5>}

          <p
            onClick={() => {
              setforgotPassword("show-showForm");
            }}
            className="setPass"
          >
            set password please
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
