"use client";
import React, { useEffect, useState } from "react";
import Header from "../_layout/header";
import Footer from "../_layout/footer";
import Aos from "aos";
import "aos/dist/aos.css";
import BuyModal from "./_global-modals/buy-modal";
import { show } from "../_services/api-call";
import { getClientCookie } from "../_services/storage";

const layout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    Aos.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      duration: 1200,
    });
  }, []);

  const [buyModal, setBuyModal] = useState(false);

  return (
    <div className={" "}>
      <Header setBuyModal={setBuyModal}></Header>
      {buyModal ? <BuyModal setBuyModal={setBuyModal} /> : null}
      {children}
      <div className="footer-area bg-gray-all">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default layout;
