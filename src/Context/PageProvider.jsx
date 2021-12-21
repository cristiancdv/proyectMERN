import React from "react";
import PageContext from "./PageContext";
import { useLocation } from "react-router-dom";

function PageProvider(props) {
    const Location = useLocation();
    let page = '';
    let url = Location.pathname

    if (url === "/") {
        page = "1"
    } else if (url === "/signin") {
        page = "2"
    } else if (url === "/login") {
        page = "3"
    } else if (url === "/Producto/crear") {
        page = "4"
    } else {
        page = "0"
    }

    return (
        <PageContext.Provider
            value={{
                page
            }}>
            {props.children}
        </PageContext.Provider>
    )
}
export default PageProvider;