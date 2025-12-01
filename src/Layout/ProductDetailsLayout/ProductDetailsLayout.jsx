import React from "react";
import TopBar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Components/Footer/Footer";

const ProductDetailsLayout = () => {
  return (
    <div>
      <header className="">
        <TopBar></TopBar>
        <Navbar></Navbar>
      </header>

      <main className="w-11/12 mx-auto">
        <section>
          <Outlet></Outlet>
        </section>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default ProductDetailsLayout;
