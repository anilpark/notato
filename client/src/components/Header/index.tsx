import React from "react";
import Logo from "../Logo";

const Header = () => {
  return (
    <header
      data-testid="header"
      style={{
        maxHeight: "64px",
      }}
    >
      <Logo />
    </header>
  );
};

export default Header;
