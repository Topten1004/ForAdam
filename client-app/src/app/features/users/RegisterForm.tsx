import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../stores/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";
import ValidationErrors from "../../errors/ValidationErrors";

const RegisterForm = observer(() => {
  const { userStore } = useStore();

  return (
    <section className="h-screen bg-[color:var(--bg-whiteRed-100)]">
      <div className="h-full px-6 text-gray-800">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between xl:justify-center">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:ml-20 xl:w-5/12">
            <Formik
              initialValues={{
                displayName: "",
                username: "",
                email: "",
                password: "",
                error: null,
              }}
              onSubmit={(values, { setErrors }) =>
                userStore
                  .register(values)
                  .catch((error) => setErrors({ error }))
              }
              validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required(),
              })}
            >
              {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form onSubmit={handleSubmit} autoComplete="off">
                  {/* <!-- Display Name input --> */}
                  <div className="mb-6">
                    <div className="relative">
                      <Field
                        name="displayName"
                        type="text"
                        className="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-[color:var(--bg-purple-100)] focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[color:var(--bg-purple-100)]"
                      />
                      <label className="absolute top-4 left-2.5 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[color:var(--bg-purple-100)] dark:text-gray-400 peer-focus:dark:text-[color:var(--bg-purple-100)]">
                        Display Name
                      </label>
                    </div>
                  </div>

                  {/* <!-- User Name input --> */}
                  <div className="mb-6">
                    <div className="relative">
                      <Field
                        name="username"
                        type="text"
                        className="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-[color:var(--bg-purple-100)] focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[color:var(--bg-purple-100)]"
                      />
                      <label className="absolute top-4 left-2.5 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[color:var(--bg-purple-100)] dark:text-gray-400 peer-focus:dark:text-[color:var(--bg-purple-100)]">
                        User Name
                      </label>
                    </div>
                  </div>

                  {/* <!-- Email input --> */}
                  <div className="mb-6">
                    <div className="relative">
                      <Field
                        type="email"
                        name="email"
                        className="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-[color:var(--bg-purple-100)] focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[color:var(--bg-purple-100)]"
                      />
                      <label className="absolute top-4 left-2.5 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[color:var(--bg-purple-100)] dark:text-gray-400 peer-focus:dark:text-[color:var(--bg-purple-100)]">
                        Email Address
                      </label>
                    </div>
                  </div>

                  {/* <!-- Password input --> */}
                  <div className="mb-6">
                    <div className="relative">
                      <Field
                        name="password"
                        type="password"
                        className="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-[color:var(--bg-purple-100)] focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[color:var(--bg-purple-100)]"
                      />
                      <label className="absolute top-4 left-2.5 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[color:var(--bg-purple-100)] dark:text-gray-400 peer-focus:dark:text-[color:var(--bg-purple-100)]">
                        Password
                      </label>
                    </div>
                  </div>

                  {/* <!-- Host checkbox here --> */}
                  <div className="mb-6">
                    <div className="relative">
                      <Field name="isVenueOwner" type="checkbox" />
                      <label>Register me as a venue owner</label>
                    </div>
                  </div>

                  <ErrorMessage
                    name="error"
                    render={() => <ValidationErrors errors={errors.error} />}
                  />

                  <div className="text-center lg:text-left">
                    <Button
                      disabled={!isValid || !dirty}
                      loading={isSubmitting}
                      type="submit"
                      style={{ backgroundColor: "#ED2B5D", color: "white" }}
                      fluid
                    >
                      Register
                    </Button>
                    <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
                      Already have an account?
                      <Link
                        to="/login"
                        className="mx-2 text-[color:var(--bg-purple-100)] transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
});

export default RegisterForm;
