import React from "react";
import AltaProducto from "../pages/CRUDProducto/AltaProducto";
import ModificarProducto from "../pages/CRUDProducto/ModificarProducto";
import Public from "./Public";
import {
  Switch,
  Route
}
  from "react-router-dom"


function Admin() {
  return (


    <>
      < Switch >


        <Route path="/Producto/crear" >
          <AltaProducto />
        </Route>

        <Route path="/Producto/modificar/:id">
          <ModificarProducto />
        </Route>


        <Public />

      </Switch>
    </>

  );
}
export default Admin;
