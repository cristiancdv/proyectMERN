import React from "react";
import { useForm } from "react-hook-form";
import FormGroup from "../components/FormGroup";
import { Button, Form } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Auth } from "../services/ProductosService";
import { useHistory } from "react-router-dom";
import AuthContext from "../Context/AuthContext";



function Registro() {

    const History = useHistory();
    const MySwal = withReactContent(Swal)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {


        try {
            const responseUser = await Auth('new', data)
            if (responseUser.status === 200 && responseUser.data === 'usuario creado correctamente') {

                MySwal.fire({
                    title: <p>El usuario {data.usuario} fue creado exitosammente</p>,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d6efd',
                }).then(() => {
                    History.push("/login")
                })
            }
        } catch (e) {

            if (e === "auth/email-already-in-use") {
                MySwal.fire({
                    title: <p>El email ya esta en uso</p>,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d6efd',
                    icon: 'error'
                })
            } else if (e === "auth/weak-password") {
                MySwal.fire({
                    title: <p>El password debe tener 6 caracteres</p>,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d6efd',
                    icon: 'error'
                })
            } else {
                MySwal.fire({
                    title: <p>{e}</p>,
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
                <FormGroup label="Nombre" register={{ ...register("nombre", { required: true }) }} />
                {errors.nombre && <span style={{ border: "1px solid red" }}>El campo es obligatorio</span>}
                <FormGroup label="Apellido" register={{ ...register("apellido", { required: true }) }} />
                {errors.apellido && <span style={{ border: "1px solid red" }}>El campo es obligatorio</span>}
                <FormGroup label="Email" type="email" register={{ ...register("email", { required: true }) }} />
                {errors.email && <span style={{ border: "1px solid red" }}>El campo es obligatorio</span>}

                <FormGroup label="Contraseña" type="password" register={{ ...register("password", { required: true, minLength: 6 }) }} />
                {errors.password?.type === "required" && <span style={{ border: "1px solid red" }}>El campo es obligatorio</span>}
                {errors.password?.type === "minLength" && <span style={{ border: "1px solid red" }}>Debe completar al menos 6 caracteres</span>}

                <AuthContext.Consumer>
                    {(context) => (
                        <>
                            {context.userLogin && (
                                <>
                                    {context.userInfo.rango === "2" && (
                                        <>

                                            <Form.Label>Rango de usuario</Form.Label>
                                            <select style={{
                                                display: "block",
                                                width: "100%",
                                                padding: " 0.375rem 0.75rem",
                                                fontSize: "1rem",
                                                fontWeight: "400",
                                                lineHeight: "1.5",
                                                backgroundClip: "padding-box",
                                                border: "1px solid #ced4da",
                                                transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out"
                                            }} {...register("rango")}>
                                                <option value="1">Usuario</option>
                                                <option value="2">Admin</option>
                                            </select>

                                        </>
                                    )}
                                </>

                            )}
                        </>
                    )}
                </AuthContext.Consumer>
                <Button variant="primary" style={{ display: "block", margin: "3rem  auto" }} type="submit">Registrarme</Button>
            </Form>
        </>
    )





}

export default Registro;