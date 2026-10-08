import { React, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import "./signIn-signup.css";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userName, setuserName] = useState("");
  const [error, seterror] = useState(false);
  const [FirebaseError, setFirebaseError] = useState("");




  return (
    <div>
      <Helmet>
        <title> Sign up page</title>
        <meta name="description" content="Sign up Page" />
      </Helmet>
      <Header />
      <main>
        <form>
          <input
            onChange={(eo) => {
              setuserName(eo.target.value);
            }}
            type="text"
            placeholder="type username"
          />
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
              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed up
                  const user = userCredential.user;
                  console.log(user);

                  sendEmailVerification(auth.currentUser).then(() => {
                    // Email verification sent!
                    // ...

                      navigate("/")
                    console.log("Email verification sent!");
                  });

                  updateProfile(auth.currentUser, {
                    displayName: userName,
                    photoURL: "https://example.com/jane-q-user/profile.jpg",
                  })
                    .then(() => {
                      console.log("Profile updated!");
                      // Profile updated!
                      // ...
                    })
                    .catch((error) => {
                      // An error occurred
                      // ...
                    });
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

                    case "auth/email-already-in-use":
                      setFirebaseError("Email Is Exists");
                      break;

                    default:
                      console.log(errorCode);
                      console.log(error.code);
                      setFirebaseError("Check your email OR password");
                  }
                  // ..
                });
            }}
          >
            Sign up
          </button>
          {error && <h5> {FirebaseError} </h5>}
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
