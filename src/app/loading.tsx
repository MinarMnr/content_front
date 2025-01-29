import React from "react";
import Header from "./_layout/header";
import Footer from "./_layout/footer";

const Loading = ({ children }: { children: React.ReactNode | any }) => {
  return (
    <div>
      <Header></Header>

      {children}

      <div className="footer-area bg-gray-all">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Loading;
