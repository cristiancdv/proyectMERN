import React, { useState } from "react";
import MarketContext from "./MarketContext";

function MarketProvider(props) {
    let [carrito, setCarrito] = useState([]);
    const storage = JSON.parse(localStorage.getItem("Carrito"));

    const initStorage = (data) => {
        if (!storage) {
            localStorage.setItem("Carrito", JSON.stringify([carrito]))
        } else if (carrito.length < storage[0].length) {
            setCarrito(storage[0])
        } else if (carrito.length > storage[0].length) {
            localStorage.setItem("Carrito", JSON.stringify([carrito]))
        }


    }
    const addCarrito = (data) => {



        const newCarrito = carrito.map((element) => {
            const producto = JSON.parse(element);

            if (producto.carrito.id === data.carrito.id) {
                producto.cantidad = producto.cantidad + data.cantidad


            }
            return JSON.stringify(producto)

        })


        if (JSON.stringify(carrito) === JSON.stringify(newCarrito)) {
            if (carrito.length === 0) {
                // console.log("nuevo");
                setCarrito([JSON.stringify(data)])
            } else {
                // console.log("diferente");
                setCarrito([...carrito, JSON.stringify(data)])
            }
        } else {

            // console.log("repetido");

            setCarrito(newCarrito)
        }




        localStorage.setItem("Carrito", JSON.stringify([carrito]))


    }

    const GetCarrito = (data) => {
        data = carrito

        return data

    }
    const DeleteCarrito = () => {
        localStorage.removeItem("Carrito");
        setCarrito([]);
    }


    return (
        <MarketContext.Provider
            value={{

                addCarrito,
                GetCarrito,
                DeleteCarrito,
                carrito,
                initStorage
            }}
        >
            {props.children}
        </MarketContext.Provider>
    );
}
export default MarketProvider;
