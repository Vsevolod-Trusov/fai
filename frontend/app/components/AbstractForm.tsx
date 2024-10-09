import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { ObjectSchema } from 'yup';

interface FieldConfig<T> {
  name: keyof T;
  label: string;
  type: string;
  options?: { label: string; value: string }[];
}

interface AbstractFormProps<T extends object> {
  initialValues: T;
  validationSchema: ObjectSchema<T>;
  onSubmit: (values: T, actions: FormikHelpers<T>) => Promise<void>;
  fields: FieldConfig<T>[];
  submitButtonText: string;
}

const AbstractForm = <T extends object>({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  submitButtonText,
}: AbstractFormProps<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          {status?.generalError && (
            <div className="text-red-500 text-sm mb-4">{status.generalError}</div>
          )}
          {fields.map((field) => (
            <div className="mb-4" key={String(field.name)}>
              <label className="block text-gray-700 mb-1" htmlFor={String(field.name)}>
                {field.label}
              </label>
              {field.type === 'select' && field.options ? (
                <Field
                  as="select"
                  id={String(field.name)}
                  name={String(field.name)}
                  className="border rounded w-full p-2"
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
              ) : (
                <Field
                  type={field.type}
                  id={String(field.name)}
                  name={String(field.name)}
                  className="border rounded w-full p-2"
                />
              )}
              <ErrorMessage
                name={String(field.name)}
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-green-500 text-white rounded w-full py-2 hover:bg-green-600 transition duration-200"
            disabled={isSubmitting}
          >
            {submitButtonText}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AbstractForm;
