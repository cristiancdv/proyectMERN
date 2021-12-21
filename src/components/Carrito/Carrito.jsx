import React, { useState, useEffect, useContext } from "react";
import { Table, Button } from 'react-bootstrap'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MarketContext from "../../Context/MarketContext";
import { useHistory } from "react-router-dom";
import { get } from "../../services/ProductosService";

function Carrito(props) {
    const datos = props.props
    const History = useHistory()
    const MySwal = withReactContent(Swal);
    const [articulos, setArticulos] = useState([]);
    const [reload, setReload] = useState(true)
    let [precioFinal, setPrecioFinal] = useState(0)
    const context = useContext(MarketContext)
    var subtotal = 0

    async function request() {
        try {
            await get('productos')
                .then(res => {
                    if (res.data) {
                        setArticulos(res.data);
                        setReload(false);
                    }

                })

        } catch (e) {
            MySwal.fire({
                title: <p>{e.code}</p>,
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#0d6efd",
                icon: "error",
            });
        }
    }
    useEffect(() => {
        if (reload) request();// eslint-disable-next-line
        setPrecioFinal(subtotal)// eslint-disable-next-line
    }, [reload]);

    articulos.map((articulo, index) => {

        const datosBD = articulo

        datos.map((element) => {
            const articulo = JSON.parse(element)

            if (datosBD.id === articulo.carrito.id) {

                let precioCantidad = datosBD.precio * articulo.cantidad
                subtotal = precioCantidad += subtotal


            }


            return subtotal
        })

        return subtotal


    })



    if (datos.length === 0) {
        return (
            <h1>No tienes productos en tu carrito</h1>
        )
    } else {
        return (
            <>
                <Table style={{ width: "80%", margin: "2rem auto" }} striped bordered hover>
                    <thead>
                        <tr>
                            <th>º</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articulos.map((articulo) => {

                            var datosBD = articulo

                            return (datos.map((element, index) => {

                                const articulo = JSON.parse(element)
                                // console.log(index);


                                if (datosBD.id === articulo.carrito.id) {

                                    return (

                                        <>
                                            <tr >
                                                <td>{index + 1}</td>
                                                <td>{datosBD.titulo}</td>
                                                <td >${datosBD.precio}</td>
                                                <td>{articulo.cantidad}</td>

                                            </tr>

                                        </>

                                    )
                                } else { return null }


                            })
                            )
                        })}
                    </tbody>

                </Table>
                <h2>Tu total a pagar es de:  ${precioFinal} </h2>
                <Button style={{ margin: "2rem" }} variant="primary" onClick={(event) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Felicidades realizaste tu compra con exito',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        context.DeleteCarrito();
                        History.push("/");
                    })
                }}> Comprar </Button>
                <Button style={{ margin: "2rem" }} variant="danger" onClick={(event) => {
                    Swal.fire({
                        title: "¿Estas Seguro?",
                        text: `tu Carrito de compras sera vaciado`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#9e0000",
                        cancelButtonColor: "#0d6efd",
                        confirmButtonText: "Vaciar",
                        cancelButtonText: "Cancelar",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({ title: "Carrito vacio", icon: 'success' });

                            context.DeleteCarrito()

                            History.push("/home")
                        }
                    })

                }}>Vaciar carrito</Button>
            </>
        )
    }
} export default Carrito