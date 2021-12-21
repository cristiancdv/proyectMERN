import React from "react";
import Menu from "./Menu";



function Footer() {
    const style = {
        p: {

            color: "white",
            backgroundColor: "rgba(13, 110, 253, .75)"

        }
    }


    return (
        <>

            <Menu datos="pills" />

            <p style={style.p}>Todos los derechos Reservados</p>

        </>
    )
}
export default Footer