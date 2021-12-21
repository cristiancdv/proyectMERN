import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { get } from "../services/ProductosService";
import Loading from "../components/Loading";
import ProductoDetalle from "../components/ProductoDetalle/ProductoDetalle";
import ProductoImagen from "../components/ProductoDetalle/ProductoImagen";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";





function Detalle() {

  const [articulo, setArticulo] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const style = {
    button: {
      display: "block",
      width: "8rem",
      margin: ".75rem auto"
    }
  }
  console.log(id);

  useEffect(() => {
    async function request() {
      try {
        const response = await get('productos', id)
        if (response) {
          setArticulo(response.data[0]);
          setLoading(false);
        }
      } catch (e) { }
    }
    request();

  }, [id]);


  return (
    <Loading active={loading}>

      <>
        {articulo && <ProductoDetalle datos={articulo} />}
        {articulo && <ProductoImagen datos={articulo.imagen} />}
        <Button style={style.button} as={Link} to="/">
          Volver
        </Button>

      </>

    </Loading>
  );
}
export default Detalle;
