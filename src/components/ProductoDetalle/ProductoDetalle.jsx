import React from "react";
import { Card } from "react-bootstrap";


function ProductoDetalle(props) {
  const { datos } = props;


  return (
    <>

      <Card.Title>Titulo: {datos.titulo} </Card.Title>
      <Card.Text> Precio: ${datos.precio} </Card.Text>
      <Card.Text> Descripcion: {datos.descripcion}</Card.Text>
      <Card.Text> SKU: {datos.sku} </Card.Text>

    </>
  );
}
export default ProductoDetalle;
