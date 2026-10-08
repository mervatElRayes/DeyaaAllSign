import { React, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteUser } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
const Profile = () => {
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
            <title> Profile page</title>
            <meta name="description" content="Profile Page" />
          </Helmet>
          <Header />
          <main>
            <div className="myProfile">
              <h1> userName Is: {user.displayName} </h1>
              <h1>Your Email Is {user.email} </h1>
            </div>
            <button
              onClick={() => {
                deleteUser(user)
                  .then(() => {
                    // User deleted.
                    console.log("User deleted.");
                  })
                  .catch((error) => {
                    const errorMessage = error.message;
                    // An error ocurred
                    console.log("An error ocurred");
                    console.log(errorMessage);
                    // ...
                  });
              }}
              className="delete"
            >
              Delete Account
            </button>
          </main>
          <Footer />
        </div>
      );
    }
  }
};

export default Profile;
