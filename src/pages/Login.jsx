import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import FormGroup from "../components/FormGroup";
import { Button, Form } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { Auth } from "../services/ProductosService";

function Login() {
    const History = useHistory();
    const MySwal = withReactContent(Swal)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const context = useContext(AuthContext)

    const onSubmit = async (data) => {

        // console.log("data",data);
        try {
            const responseUser = await Auth('auth', data)

            // console.log(responseUser.status);
            if (responseUser.status === 200 && responseUser.data[1] === 'autenticado') {
                // console.log(context);
                const auth = responseUser.data[0]
                context.loginUser(auth);

                MySwal.fire({
                    title: <p>Bienvenido {auth.nombre}  </p>,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d6efd',
                }).then(() => {
                    History.push("/");
                })
            }
        } catch (e) {
            const errorCode = e.request.status
            const message = e.request.response

            if (errorCode === 401) {
                MySwal.fire({
                    title: <p>{message}</p>,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d6efd',
                    icon: 'error'
                })
            }




        }
    }


    return (
        <>

            <Form style={{ width: '20rem', margin: 'auto' }} onSubmit={handleSubmit(onSubmit)}>
                <FormGroup label="Usuario" register={{ ...register("usuario", { required: true }) }} />
                {errors.usuario && <span style={{ border: "1px solid red" }}>El campo es obligatorio</span>}
                <FormGroup label="Contraseña" type="password" register={{ ...register("password", { required: true, minLength: 6 }) }} />
                {errors.password?.type === "required" && <span style={{ border: "1px solid red" }}>El campo es obligatorio</span>}
                {errors.password?.type === "minLength" && <span style={{ border: "1px solid red" }}>Debe completar al menos 6 caracteres</span>}

                <Button variant="primary" style={{ display: "block", margin: "3rem  auto" }} type="submit">Ingresar</Button>
            </Form>
        </>
    )




}
export default Login