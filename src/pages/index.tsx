import { type NextPage } from "next";
import Head from "next/head";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { api } from "@/utils/api";
import { FormInput } from "@/components";

import { PulseLoader } from "react-spinners";
import { useState } from "react";

YupPassword(Yup);

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const { data, mutate } = api.user.registerUser.useMutation();
  const query = api.user.verifyLogin.useQuery(
    {
      email: email,
      password: pw,
    },
    {
      retry: false,
    }
  );
  const [isRegister, setIsRegister] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>Attendance | FGACYC YWKL</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-white/10 p-4">
            <p className="mb-2 text-center text-xl font-semibold text-white">
              {isRegister ? "Register" : "Login"}
            </p>
            <Formik
              initialValues={{ email: "", password: "", confirm: "" }}
              onSubmit={async (values, actions) => {
                // alert(JSON.stringify(values, null, 2));

                if (isRegister) {
                  mutate({
                    email: values.email,
                    password: values.password,
                  });
                  console.warn("mutate data", data);
                } else {
                  setEmail(values.email);
                  setPw(values.password);
                  await query
                    .refetch()
                    .then((res) => console.warn("verify data", res.data));
                }
                actions.setSubmitting(false);
                setEmail("");
                setPw("");
                actions.resetForm();
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email format")
                  .required("Email is required"),
                password: Yup.string()
                  .required("Password is required")
                  .min(8, "Minimum 8 characters")
                  .max(14, "Maximum 14 characters")
                  .minLowercase(
                    1,
                    "Password must have at least 1 lowercase letter"
                  )
                  .minUppercase(
                    1,
                    "Password must have at least 1 uppercase letter"
                  )
                  .minSymbols(1, "Password must have 1 symbol"),
                confirm: isRegister
                  ? Yup.string()
                      .oneOf([Yup.ref("password")], "Passwords must match")
                      .required("Required")
                  : Yup.string().notRequired(),
              })}
            >
              {({
                isSubmitting,
                values,
                errors,
                handleSubmit,
                handleChange,
                handleBlur,
                resetForm,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <FormInput
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                    name="email"
                    errors={errors}
                  />
                  <FormInput
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                    name="password"
                    errors={errors}
                  />

                  <FormInput
                    visible={isRegister}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                    name="confirm"
                    errors={errors}
                  />

                  <div className="mt-3 flex flex-row justify-between text-white">
                    <button
                      type="button"
                      className="rounded-md bg-blue-500 px-3 py-1 font-semibold hover:bg-blue-500/60"
                      onClick={() => {
                        setIsRegister((state) => !state);
                        resetForm();
                      }}
                    >
                      {isRegister ? "Login" : "Register"}
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-green-500 px-3 py-1 font-semibold hover:bg-green-500/60"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <PulseLoader
                          color="#fff"
                          size={7}
                          speedMultiplier={0.75}
                        />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
