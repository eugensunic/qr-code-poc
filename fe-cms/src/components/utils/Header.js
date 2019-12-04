import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isLoggedIn } from "../../helpers";
import Navbar from "./Navbar";
function Header(route) {
  return (
    <header className="bg-dark">
      <Navbar />
    </header>
  );
}

export default withRouter(Header);
