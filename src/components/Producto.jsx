import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import ProductoDetalle from "./ProductoDetalle/ProductoDetalle";
import AuthContext from "../Context/AuthContext";
import MarketContext from "../Context/MarketContext";
function Producto(props) {
  const { datos, handleDelete } = props;
  const context = useContext(MarketContext);
  const [loading, setLoading] = useState(false)
  const [carrito, setCarrito] = useState([]);

  const styles = {
    button: {
      margin: "1rem",
    },
    image: {
      width: "10px",
      height: "30px",
      margin: "auto",
    },
  };


  if (loading) {
    const cantidad = 1
    // context.DeleteCarrito()
    context.addCarrito({ carrito, "cantidad": cantidad })
    setLoading(false);
  }

  return (
    <>
      <AuthContext.Consumer>
        {(context) => (
          <>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <ProductoDetalle datos={datos} />
                <Button variant="primary" as={Link} to={"/detalle/" + datos.id}>
                  Ver detalle
                </Button>{" "}
                {context.userLogin && (
                  <>
                    {context.userInfo.rango === "2" && (
                      <>
                        <Button
                          style={styles.button}
                          variant="primary"
                          as={Link}
                          to={"/Producto/modificar/" + datos.id}
                        >
                          Modificar
                        </Button>

                        <Button
                          variant="danger"
                          onClick={(event) => handleDelete(datos)}
                        >
                          Eliminar
                        </Button>
                      </>
                    )}
                    {context.userInfo.rango === "1" && (
                      <>

                        <Button
                          style={styles.button}
                          variant="primary"
                          onClick={(event) => {
                            setCarrito(props.datos);
                            setLoading(true)
                          }}
                        >
                          Añadir al carrito
                        </Button>

                      </>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>
          </>
        )}
      </AuthContext.Consumer>
    </>
  );
}
export default Producto