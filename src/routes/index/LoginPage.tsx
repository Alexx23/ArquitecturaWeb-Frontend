import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthAPI, { LoginRequest } from "../../api/AuthAPI";
import Loading from "../../components/Loading";
import RequestPasswordModal from "../../components/modals/RequestPasswordModal";
import { useUser } from "../../context/UserContext";
import { publish } from "../../utils/CustomEvents";
import RoleEnum from "../../utils/RoleEnum";

function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showRequestPasswordModal, setShowRequestPasswordModal] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const user = useUser();

  const submitForm = (data: LoginRequest) => {
    setIsLoading(true);
    AuthAPI.login({
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        user.setUser?.(res);
        if (res.role.id == RoleEnum.ADMIN) {
          window.location.href = "/admin";
        } else if (res.role.id == RoleEnum.CLIENT) {
          navigate("/movies");
        }
      })
      .catch((err) => {
        publish("showApiErrorMessage", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 bg-gradient-to-br from-teal-200 to-indigo-700">
        <Link to="/">
          <img
            src="/img/logo.png"
            className="h-24 rounded-3xl"
            alt="Filmy logo"
          />
        </Link>
        <div className="mt-6 w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Iniciar sesión
          </h2>
          <form className="mt-8 space-y-6" action="#">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Dirección de correo electrónico o nombre de usuario
              </label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                {...register("email", {
                  required: "Email necesario",
                  minLength: {
                    value: 1,
                    message: "Nombre necesario",
                  },
                })}
              />
              {errors.email && (
                <p className="pt-2 text-red-500 text-base italic">
                  {errors.email.message + ""}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  {...register("password", {
                    required: "Contraseña necesaria",
                    minLength: {
                      value: 1,
                      message: "Contraseña necesaria",
                    },
                  })}
                />
                <FontAwesomeIcon
                  icon={showPassword ? "eye-slash" : "eye"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-900 dark:text-white absolute right-0 top-1/2 transform -translate-y-1/2 px-3 py-2 w-6 h-6"
                />
              </div>
              {errors.password && (
                <p className="pt-2 text-red-500 text-base italic">
                  {errors.password.message + ""}
                </p>
              )}
            </div>
            <div className="flex items-start">
              <span
                onClick={() => setShowRequestPasswordModal(true)}
                className="cursor-pointer ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
              >
                ¿Has olvidado tu contraseña?
              </span>
            </div>
            <button
              onClick={handleSubmit(submitForm)}
              disabled={isLoading ? true : false}
              type="submit"
              className="flex w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {isLoading && <Loading color="fill-teal-400" size="h-6" />}
              Iniciar sesión
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              ¿Aún no tienes cuenta?{" "}
              <Link
                to="/register"
                className="text-primary-700 hover:underline dark:text-primary-500"
              >
                Regístrate
              </Link>
            </div>
          </form>
        </div>
      </div>
      <RequestPasswordModal
        show={showRequestPasswordModal}
        onClose={() => setShowRequestPasswordModal(false)}
      />
    </>
  );
}

export default LoginPage;
