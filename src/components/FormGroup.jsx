import React from "react";
import { Form, InputGroup } from "react-bootstrap";
function FormGroup(props) {
  const { label, text, type, register } = props;

  return (
    <>
      <Form.Group className="mb-3" >
        <Form.Label>{label}</Form.Label>
        <InputGroup>
          {text && (
            <>
              <InputGroup.Text
                style={{
                  position: "absolute",
                  display: "flex",
                  left: "-2rem",
                }}
              >
                {text}
              </InputGroup.Text>
            </>
          )}
        </InputGroup>
        <Form.Control type={type || "text"} {...register}></Form.Control>
      </Form.Group>
    </>
  );
}
export default FormGroup;
