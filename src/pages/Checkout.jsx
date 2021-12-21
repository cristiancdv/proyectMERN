import React, { useContext } from "react";
import Carrito from "../components/Carrito/Carrito";
import MarketContext from "../Context/MarketContext";

function Checkout() {
    const context = useContext(MarketContext)
    let articulos = context.GetCarrito()


    return (

        <>
            <h1>Estas por comprar</h1>
            <Carrito props={articulos} />

        </>

    )


}
export default Checkout;