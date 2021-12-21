import React, { useState, useEffect } from "react";
import Producto from "../components/Producto";
import { Container, Row } from "react-bootstrap";
import { deleted, get } from "../services/ProductosService";
import Loading from "../components/Loading";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";



function Productos() {
  const History = useHistory()
  const MySwal = withReactContent(Swal);
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);


  function request() {
    try {
      get('productos')
        .then(res => {

          setArticulos(res.data)

        })
    } catch (e) {
      MySwal.fire({
        title: <p>{e}</p>,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#0d6efd",
        icon: "error",
      });
    }
    setLoading(false);
    setReload(false);
  }

  useEffect(() => {
    if (reload) request()// eslint-disable-next-line
  }, [reload])
  function handleDelete(datos) {

    Swal.fire({
      title: "¿Estas Seguro?",
      text: `el Producto ${datos.titulo} sera eliminado`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9e0000",
      cancelButtonColor: "#0d6efd",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {

        Swal.fire("Borrado", datos.titulo + " fue eliminado", "success");
        // console.log("Eliminar",id)
        // console.log(document)
        History.push("/home");

        try {

          await deleted('productos', datos.id);

        } catch (e) {
          const message = e.request.response

          MySwal.fire({
            title: <p>{message}</p>,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0d6efd',
            icon: 'error'
          })

        }
      };
    });
  }
  return (
    <Loading active={loading}>
      <>
        {articulos && (
          <>
            <h2>Listado de Productos</h2>
            <Container>
              <Row className="justify-content-center">
                {articulos.map((articulo) => (
                  <Producto
                    key={articulo.id}
                    datos={{ ...articulo }}
                    handleDelete={handleDelete}
                  />
                ))}
              </Row>
            </Container>
          </>
        )}
      </>
    </Loading>
  );
}
export default Productos;
