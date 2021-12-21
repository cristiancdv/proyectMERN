import React from "react";
import { useForm } from "react-hook-form";
import FormGroup from "../../components/FormGroup";
import Button from "react-bootstrap/Button";
import { add } from "../../services/ProductosService";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AltaProducto() {
  const MySwal = withReactContent(Swal);
  const { register, handleSubmit, formState: { errors },
  } = useForm();

  const History = useHistory();

  const onSubmit = async (data) => {
    let formData = new FormData();
    if (data.imagen[0]) {
      let image = data.imagen[0];
      formData.append('imagen', image)
    }
    formData.append('titulo', data.titulo)
    formData.append('precio', data.precio)
    formData.append('descripcion', data.descripcion)
    formData.append('sku', data.sku)



    try {

      await add(formData, 'productos')

      MySwal.fire({
        title: <p>Producto creado exitosamente </p>,
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#0d6efd",
      })
        .then(() => {
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
  return (
    <div>
      <form
        style={{ width: "25rem", margin: "auto" }}
        encType="multipart/form-data"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGroup
          label="Titulo"
          register={{ ...register("titulo", { required: true }) }}
        />
        {errors.titulo && <span>El campo es obligatorio</span>}
        <FormGroup
          label="Precio"
          text="$"
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
          register={{ ...register("imagen", { required: true }) }}
        />
        {errors.file && <span>El campo es obligatorio</span>}

        <Button type="submit" variant="primary">
          Crear Producto
        </Button>
      </form>
    </div>
  );
}
export default AltaProducto;
