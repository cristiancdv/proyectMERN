import Registro from "../pages/Registro";
import Login from "../pages/Login";
import Detalle from "../pages/Detalle";
import Home from "../pages/Home";
import Checkout from "../pages/Checkout";
import NotFound from "../pages/NotFound";


// eslint-disable-next-line
import {
  Redirect,
  Switch,
  Route
} from "react-router-dom";

function Public() {
  return (
    <Switch>

      <Route path="/signin">
        <Registro />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/detalle/:id">
        <Detalle />
      </Route>

      <Route path="/compra/">
        <Checkout />
      </Route>

      <Redirect from="/home" to="/" />
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="*">
        <NotFound />
      </Route>

    </Switch>
  );
}

export default Public;
