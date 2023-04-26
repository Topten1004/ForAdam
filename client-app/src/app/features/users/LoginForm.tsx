import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../stores/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "semantic-ui-react";
import FacebookLogin from "@greatsumini/react-facebook-login";

const LoginForm = observer(() => {
  const { userStore } = useStore();

  return (
    <section className="h-screen bg-[color:var(--bg-whiteRed-100)]">
      <div className="h-full px-6 text-gray-800">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between xl:justify-center">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:ml-20 xl:w-5/12">
            <Formik
              initialValues={{ email: "", password: "", error: null }}
              onSubmit={(values, { setErrors }) =>
                userStore
                  .login(values)
                  .catch((error) =>
                    setErrors({ error: "Invalid email or password" })
                  )
              }
            >
              {({ handleSubmit, isSubmitting, errors }) => (
                <Form onSubmit={handleSubmit} autoComplete="off">
                  <div className="flex flex-row items-center justify-center lg:justify-start">
                    <Button
                      fluid
                      as={FacebookLogin}
                      appId="177354068069718"
                      size="large"
                      color="facebook"
                      content="Login with Facebook"
                      loading={userStore.fbLogin}
                      onSuccess={(response: any) => {
                        userStore.facebookLogin(response.accessToken);
                      }}
                      onFail={(response: any) => {
                        console.log("Login failed with facebook", response);
                      }}
                    ></Button>
                  </div>

                  <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
                    <p className="mx-4 mb-0 text-center font-semibold">Or</p>
                  </div>

                  {/* <!-- Email input --> */}
                  <div className="mb-6">
                    <div className="relative">
                      <Field
                        type="email"
                        name="email"
                        className="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-[color:var(--bg-purple-100)] focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[color:var(--bg-purple-100)]"
                      ></Field>
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
                  <ErrorMessage
                    name="error"
                    render={() => (
                      <p className="text-lg font-normal text-red-500">
                        {errors.error}
                      </p>
                    )}
                  />
                  {/* <div className="mb-6 flex items-center justify-between">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-[color:var(--bg-purple-100)] checked:bg-[color:var(--bg-purple-100)] focus:outline-none"
                        id="exampleCheck2"
                      />
                      <label className="form-check-label inline-block text-gray-800">
                        Remember me
                      </label>
                    </div>
                    <a
                      href="#!"
                      className="text-[color:var(--bg-purple-100)] transition duration-200 ease-in-out hover:text-[color:var(--bg-purple-100)] focus:text-[color:var(--bg-purple-100)] active:text-[color:var(--bg-purple-100)]"
                    >
                      Forgot password?
                    </a>
                  </div> */}

                  <div className="text-center lg:text-left">
                    <Button
                      loading={isSubmitting}
                      type="submit"
                      style={{ backgroundColor: "#ED2B5D", color: "white" }}
                      fluid
                    >
                      Login
                    </Button>
                    <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
                      Don't have an account?
                      <Link
                        to="/register"
                        className="mx-2 text-[color:var(--bg-purple-100)] transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700"
                      >
                        Register
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

export default LoginForm;
