import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { add, get, deleted } from "../../services/ProductosService";
import Button from "react-bootstrap/Button";
import FormGroup from "../../components/FormGroup";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function ModificarProducto() {
  //Modificar producto
  const [check, setCheck] = useState(false);
  const MySwal = withReactContent(Swal);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();
  // console.log(check);
  const History = useHistory();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const onSubmit = async (data) => {
    // console.log(data);
    let formData = new FormData();
    let image = data.imagen[0];

    // console.log(image);
    if (check === true || image) {
      formData.append('imagen', image)
    }
    formData.append('titulo', data.titulo)
    formData.append('precio', data.precio)
    formData.append('descripcion', data.descripcion)
    formData.append('sku', data.sku)
    formData.append('id', id)
    try {

      await add(formData, 'productos', id)

      MySwal.fire({
        title: <p>Producto modificado exitosamente </p>,
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#0d6efd",
      }).then(() => {
        History.push("/");
      });
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
  async function request() {
    try {
      const response = await get('productos', id)
      if (response) {
        setLoading(false);

        setValue("titulo", response.data[0].titulo);
        setValue("precio", response.data[0].precio);
        setValue("descripcion", response.data[0].descripcion);
        setValue("sku", response.data[0].sku);
        // setValue("imagen", response.data().imagen);
      }
    } catch (e) {
      const message = e.req
      console.log(e);
      MySwal.fire({
        title: <p>{message}</p>,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0d6efd',
        icon: 'error'
      })
    }
  }

  // console.log(id);
  useEffect(() => {
    request(); // eslint-disable-next-line
  }, [id]);
  const handleDelete = (datos) => {

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
        History.push("/home")

        try {

          await deleted('productos', datos.id)

        } catch (e) {
          MySwal.fire({
            title: <p>{e.code}</p>,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#0d6efd",
            icon: "error",
          });
        }
      };
    })
  }

  return (
    <Loading active={loading}>
      <>
        <Button variant="danger" onClick={handleDelete}>
          Eliminar
        </Button>

        <h1>Modificar</h1>
        <form
          style={{ width: "20rem", margin: "1rem auto" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup
            label="Nombre"
            register={{ ...register("titulo", { required: true }) }}
          />
          {errors.nombre && <span>El campo es obligatorio</span>}
          <FormGroup
            label="Precio"
            register={{ ...register("precio", { required: true }) }}
          />
          {errors.precio && <span>El campo es obligatorio</span>}
          <FormGroup
            label="Descripcion"
            type="text"
            register={{ ...register("descripcion", { required: true }) }}
          />
          {errors.descripcion && <span>El campo es obligatorio</span>}

          <FormGroup
            label="SKU"
            register={{ ...register("sku", { required: true }) }}
          />
          {errors.sku && <span>El campo es obligatorio</span>}

          <FormGroup
            label="Imagen"
            type="file"
            register={{ ...register("imagen") }}
          />

          <Form.Check
            label="Borrar imagen"
            type="checkbox"
            onClick={e => {
              setCheck(e.target.checked);
            }}
          />



          <Button type="submit" variant="primary">
            Guardar
          </Button>
        </form>
      </>
    </Loading>
  );
}
export default ModificarProducto;
