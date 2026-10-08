import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Loading = () => {
  return (
    <div>
      <Header />
      <main>
        <div className="loader"></div>
      </main>
      <Footer />
    </div>
  );
};

export default Loading;
