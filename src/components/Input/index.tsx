/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { FormikValues } from "formik";
import type { ChangeEvent, FocusEvent, FunctionComponent } from "react";

type FormInputProps = {
  name: string;
  handleChange: (e: ChangeEvent<unknown>) => void;
  handleBlur: (e: FocusEvent<unknown, Element>) => void;
  values: FormikValues;
  errors: {
    [field: string]: string;
  };
  visible?: boolean;
};

export const FormInput: FunctionComponent<FormInputProps> = ({
  name,
  handleChange,
  handleBlur,
  values,
  errors,
  visible = true,
}) => {
  return (
    <div className={`flex-col justify-center ${visible ? "flex" : "hidden"}`}>
      <div className="flex flex-row items-center">
        <p className="w-[130px] pr-2 font-montserrat text-sm capitalize text-white/75">{`${name}: `}</p>
        <input
          className="w-full rounded-md bg-white/10 px-2 py-1 text-white"
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[name]}
          type={
            name === "email" || name === "password"
              ? name
              : name === "confirm"
              ? "password"
              : "text"
          }
        />
      </div>
      <p className="my-1 text-end text-xs text-red-500">{errors[name] ?? ""}</p>
    </div>
  );
};
