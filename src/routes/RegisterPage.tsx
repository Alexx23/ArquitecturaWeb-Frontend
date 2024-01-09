import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthAPI, { RegisterRequest } from "../api/AuthAPI";
import Loading from "../components/Loading";
import ApiErrorModal from "../components/modals/ApiErrorModal";
import SuccessModal from "../components/modals/SuccessModal";
import { publish } from "../utils/CustomEvents";

function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterRequest>();

  const password = watch("password", "");

  const submitForm = (data: RegisterRequest) => {
    setIsLoading(true);
    AuthAPI.register({
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    })
      .then((res) => {
        publish("showSuccessMessage", "¡Has sido registrado correctamente!");
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
      <div className="min-h-screen flex flex-col items-center px-6 pt-8 mx-auto pt:mt-0 bg-gradient-to-br from-teal-200 to-indigo-700">
        <Link
          to="/"
          className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
        >
          <img
            src="/img/logo.png"
            className="h-28 rounded-3xl"
            alt="Filmy logo"
          />
        </Link>
        <div className="w-full max-w-xl p-6 mb-10 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ¡Crea una nueva cuenta! Es gratis y rápido
          </h2>
          <form className="mt-8 space-y-6" action="#">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nombre y apellidos
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Tu nombre y apellidos"
                required
                {...register("name", {
                  required: "Nombre necesario",
                  minLength: {
                    value: 1,
                    message: "Nombre necesario",
                  },
                })}
              />
              {errors.name && (
                <p className="pt-2 text-red-500 text-base italic">
                  {errors.name.message + ""}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nombre de usuario
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Tu nombre de usuario"
                required
                {...register("username", {
                  required: "Nombre de usuario necesario",
                  minLength: {
                    value: 1,
                    message: "Nombre de usuario necesario",
                  },
                })}
              />
              {errors.username && (
                <p className="pt-2 text-red-500 text-base italic">
                  {errors.username.message + ""}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Dirección de correo electrónico
              </label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Tu email"
                required
                {...register("email", {
                  required: "Email necesario",
                  minLength: {
                    value: 1,
                    message: "Email necesario",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Debe ser un email",
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
                  placeholder="Tu contraseña"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  {...register("password", {
                    required: "Contraseña necesaria",
                    minLength: {
                      value: 8,
                      message: "La contraseña debe tener al menos 8 caracteres",
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
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirmar contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Tu contraseña"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                {...register("password_confirmation", {
                  required: "Confirmación de contraseña necesaria",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                })}
              />
              {errors.password_confirmation && (
                <p className="pt-2 text-red-500 text-base italic">
                  {errors.password_confirmation.message + ""}
                </p>
              )}
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-900 dark:text-white">
                  Acepto los{" "}
                  <Link
                    to="/terms_and_conditions"
                    className="text-primary-700 hover:underline dark:text-primary-500"
                  >
                    Términos y Condiciones de uso
                  </Link>
                </label>
              </div>
            </div>
            <button
              onClick={handleSubmit(submitForm)}
              disabled={isLoading ? true : false}
              type="submit"
              className="flex w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {isLoading && <Loading color="fill-teal-500" size="h-6" />}
              Registrarme
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-primary-700 hover:underline dark:text-primary-500"
              >
                Inicia sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
      <SuccessModal />
      <ApiErrorModal />
    </>
  );
}

export default RegisterPage;
