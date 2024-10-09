// import { createDeal } from "@/app/services/dealService";
// import { dealValidationForm } from "@/app/validation/dealFormValidation";
// import { ErrorMessage, useFormik } from "formik";

// import { initialValues } from "./constants";
// import { IDeal } from "./types";

// export function DealForm() {
//   const { handleSubmit, errors, touched, handleChange, handleBlur } =
//     useFormik<IDeal>({
//       initialValues,
//       validationSchema: dealValidationForm,
//       onSubmit: async (values: IDeal) => {
//         const result = await createDeal(values);
//       },
//     });

//   return (
//     <section>
//       <form
//         autoComplete="off"
//         onSubmit={handleSubmit}
//         className="flex min-w-[100%] flex-col items-center"
//       >
//         <section>
//           <input
//             type="text"
//             name={"title"}
//             onChange={handleChange}
//             onBlur={handleBlur}
//           />
//           <ErrorMessage
//             name={"text"}
//             component="div"
//             className="text-red-500 text-sm mt-1"
//           />
//           {errors["title"] && <p>{errors["title"]}</p>}
//         </section>
//         <section>
//           <input type="text" />
//           <p></p>
//         </section>
//         <button type="submit">Create</button>
//       </form>
//     </section>
//   );
// }
