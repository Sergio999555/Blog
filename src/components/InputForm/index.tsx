import React from "react";
import { InputProps } from "../../types";
import "../InputForm/style.scss";

const InputForm = React.forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  InputProps
>((props, ref) => {
  const {
    label,
    textarea,
    errorMessage,
    errors,
    responseError = null,
    id,
    name,
    ...inputProps
  } = props;

  const contentInput = textarea ? (
    <textarea {...inputProps} id={id} name={name} ref={ref} />
  ) : (
    <input {...inputProps} id={id} name={name} ref={ref} className="input" />
  );

  return (
    <>
      {label && (
        <label className="title" htmlFor={id}>
          {label}
        </label>
      )}
      {contentInput}
      {errors?.[name] && <span>{errorMessage}</span>}
      <span>{responseError}</span>
    </>
  );
});

export default InputForm;
