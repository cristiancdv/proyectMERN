import React, { useContext } from "react";
import Menu from "./Menu";
import MarketContext from "../Context/MarketContext";


function Header() {
  const context = useContext(MarketContext);
  context.initStorage();



  return (
    <div>
      <Menu datos="tabs" />
    </div>
  );
}
export default Header;
