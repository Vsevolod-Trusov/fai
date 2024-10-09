import { IDeal } from "@/app/components/DealForm/types";
import * as Yup from "yup";

export const dealValidationSchema: Yup.ObjectSchema<IDeal> = Yup.object().shape(
  {
    id: Yup.string().required(),
    title: Yup.string()
      .max(20, "Title max size is 20 characters")
      .required("Title is required"),
    description: Yup.string()
      .max(300, "Description max size is 300")
      .required("Description is required"),
  }
);

export const dealUpdateValidationSchema: Yup.ObjectSchema<IDeal> =
  Yup.object().shape({
    id: Yup.string().required(),
    title: Yup.string()
      .max(20, "Title max size is 20 characters")
      .required("Title is required"),
    description: Yup.string()
      .max(300, "Description max size is 300")
      .required("Description is required"),
  });
