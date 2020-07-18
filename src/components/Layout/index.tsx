import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main className="">
        <section className="">
          <div className="">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
