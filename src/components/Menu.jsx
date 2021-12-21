import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import AuthContext from "../Context/AuthContext";
import PageContext from "../Context/PageContext";


function Menu(props) {
    const { datos } = props;
    const context = useContext(PageContext)
    var valor = context.page



    return (
        <div>
            <AuthContext.Consumer>
                {(context) => (
                    <>
                        <Nav variant={datos} activeKey={valor}>
                            <Nav.Item>
                                <Nav.Link eventKey="1" as={Link} to="/">
                                    Inicio
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="2" as={Link} to="/signin">
                                    Registrarse
                                </Nav.Link>
                            </Nav.Item>
                            {!context.userLogin && (
                                <Nav.Item>
                                    <Nav.Link eventKey="3" as={Link} to="/login">
                                        Iniciar Sesion
                                    </Nav.Link>
                                </Nav.Item>
                            )}
                            {context.userLogin && (
                                <>

                                    {
                                        context.userInfo.rango === "2" && (
                                            <>
                                                <Nav.Item >
                                                    <NavDropdown

                                                        title="Producto"
                                                        id="nav-dropdown"
                                                    >
                                                        <NavDropdown.Item eventKey="4" as={Link} to="/Producto/crear">
                                                            Crear
                                                        </NavDropdown.Item>
                                                        <NavDropdown.Item as={Link} to="/">
                                                            Ver Todos
                                                        </NavDropdown.Item>
                                                    </NavDropdown>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link onClick={context.logoutUser}>Salir</Nav.Link>
                                                </Nav.Item>
                                            </>
                                        )
                                    }
                                    {context.userInfo.rango === "1" && (
                                        <>
                                            <Nav.Item >
                                                <NavDropdown

                                                    title="Producto"
                                                    id="nav-dropdown"
                                                >
                                                    <NavDropdown.Item eventKey="4" as={Link} to="/compra">
                                                        Ver Carrito
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Item as={Link} to="/">
                                                        Home
                                                    </NavDropdown.Item>
                                                </NavDropdown>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link onClick={context.logoutUser}>Salir</Nav.Link>
                                            </Nav.Item>
                                        </>
                                    )}
                                </>
                            )}
                        </Nav>
                    </>
                )}
            </AuthContext.Consumer>
        </div>
    );
}
export default Menu;
