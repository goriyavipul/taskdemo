import React, { ReactNode } from "react";
import Header from "@components/Common/Header";
import Footer from "@components/Common/Footer";

interface ILayout {
  children: ReactNode;
  isFullScreen?: boolean;
}

const Layout = ({ children }: ILayout) => {
  return (
    <React.Fragment>
      <div className="bg-[#011625]">
        <div className="p-6 min-h-screen flex flex-col justify-between">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
