import React, { FC } from "react";
import { useForm } from "react-hook-form";

import { IFormatDataTags } from "../../types";
import { InputFormTag } from "../../config";
import InputForm from "../InputForm";

import "../FormTags/style.scss";

export const FormAddTags: FC<{ onAdd: (value: string) => void }> = ({
  onAdd,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormatDataTags>({ mode: "onChange" });

  const addTags = (data: IFormatDataTags) => {
    onAdd(data.tag);
    reset();
  };
  const { rules, ...propsInputTag } = InputFormTag;
  const propsInputTagWithError = { ...propsInputTag, errors };

  return (
    <form onSubmit={handleSubmit(addTags)}>
      <InputForm {...propsInputTagWithError} {...register("tag")} />
      <button type="submit" className="tags__button--submit">
        Add Tag
      </button>
    </form>
  );
};
