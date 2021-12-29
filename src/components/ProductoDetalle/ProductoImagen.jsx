import React from "react"
import { cloudynari } from "../../config/config"
const styles = {
    imagen: {
        maxWidth: "5rem"
    },
    parrafo: {
        color: "red",
        fontSize: "1.5rem"
    }
}
function ProductoImagen(props) {
    const { datos } = props

    if (datos === 'undefined') {
        return (
            <>
                <p style={styles.parrafo}>Imagen no disponible</p>
            </>
        )
    } else {
        return (
            <>

                <img alt="imagen no disponible" style={styles.imagen} src={`${cloudynari.url}` + datos}></img>

            </>
        )

    }


}
export default ProductoImagen