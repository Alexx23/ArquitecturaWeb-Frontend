import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CardAPI, { Card, CardCreate } from "../../api/CardAPI";
import UserAPI, { ChangePassword, UserUpdate } from "../../api/UserAPI";
import CardForm from "../../components/client/CardForm";
import ClientNavbar from "../../components/client/ClientNavbar";
import Loading from "../../components/Loading";
import ApiErrorModal from "../../components/modals/ApiErrorModal";
import DeleteModal from "../../components/modals/DeleteModal";
import SuccessModal from "../../components/modals/SuccessModal";
import UpdateModal from "../../components/modals/UpdateModal";
import { useUser } from "../../context/UserContext";
import { publish } from "../../utils/CustomEvents";
import { formatCardExpirationDate } from "../../utils/DateUtils";

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeletingCard, setIsDeletingCard] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [deleteCard, setDeleteCard] = useState<Card | null>(null);
  const [showCreateCard, setShowCreateCard] = useState(false);

  const { user } = useUser();
  const navigate = useNavigate();

  const switchDarkMode = () => {
    if (localStorage.getItem("dark-theme") == null) {
      return;
    }

    if (localStorage.getItem("dark-theme") == "true") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-theme", "false");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-theme", "true");
      setDarkMode(true);
    }
  };

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    setValue: setValueUpdate,
    formState: { errors: errorsUpdate },
  } = useForm<UserUpdate>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    setValue: setValuePassword,
    watch: watchPassword,
    formState: { errors: errorsPassword },
  } = useForm<ChangePassword>();
  const newPassword = watchPassword("new_password", "");

  const submitUpdateUser = (data: UserUpdate) => {
    if (isUpdating) return;
    setIsUpdating(true);
    UserAPI.updateUser(data)
      .then((res) => {
        publish("showSuccessMessage", "Perfil actualizado correctamente");
      })
      .catch((err) => {
        publish("showApiErrorMessage", err);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const submitChangePassword = (data: ChangePassword) => {
    if (isChangingPassword) return;
    setIsChangingPassword(true);
    UserAPI.changePassword(data)
      .then((res) => {
        publish("showSuccessMessage", "Contraseña cambiada correctamente");
        setValuePassword("current_password", "");
        setValuePassword("new_password", "");
        setValuePassword("new_password_confirmation", "");
      })
      .catch((err) => {
        publish("showApiErrorMessage", err);
      })
      .finally(() => {
        setIsChangingPassword(false);
      });
  };

  const submitDeleteCard = () => {
    if (deleteCard == null) return;
    if (isDeletingCard) return;
    setIsDeletingCard(true);
    CardAPI.deleteCard(deleteCard.id)
      .then((res) => {
        publish("showSuccessMessage", "Tarjeta eliminada correctamente");
        navigate(0); // Actualizar página
      })
      .catch((err) => {
        publish("showApiErrorMessage", err);
      })
      .finally(() => {
        setIsDeletingCard(false);
      });
    setDeleteCard(null);
  };

  const handleCreateCard = (data: CardCreate) => {
    CardAPI.createCard(data)
      .then((res) => {
        publish("showSuccessMessage", "Tarjeta añadida correctamente");
        navigate(0); // Actualizar página
      })
      .catch((err) => {
        publish("showApiErrorMessage", err);
      });
  };

  useEffect(() => {
    setValueUpdate("name", user?.name);
    setValueUpdate("username", user?.username);
    setValueUpdate("email", user?.email);
  }, [user]);

  useEffect(() => {
    setDarkMode(localStorage.getItem("dark-theme") == "true");
  }, []);

  return (
    <>
      <ClientNavbar darkMode={darkMode} switchDarkMode={switchDarkMode} />
      <div className="m-auto max-w-[1366px] pt-20 pb-40 grid grid-cols-1 px-4 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Ajustes de perfil
          </h1>
        </div>
        <div className="col-span-full xl:col-auto">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="flow-root">
              <h3 className="text-xl font-semibold dark:text-white">
                Tarjetas
              </h3>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {user?.card_list.map((card) => (
                  <li key={card.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <FontAwesomeIcon
                          icon="credit-card"
                          className="w-8 h-8"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                          {card.title}
                        </span>
                        <span className="block text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                          **** **** **** ****{" ("}
                          {formatCardExpirationDate(new Date(card.expiration))}
                          {")"}
                        </span>
                      </div>
                      <div className="inline-flex items-center">
                        <button
                          onClick={() => setDeleteCard(card)}
                          className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <button
                  onClick={() => setShowCreateCard(true)}
                  className="mt-2 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <FontAwesomeIcon icon="plus" className="mr-2 w-4 h-4" />
                  Añadir tarjeta
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Información general
            </h3>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nombre y apellidos
                </label>
                <input
                  type="text"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  {...registerUpdate("name", {
                    required: "Nombre necesario",
                    minLength: {
                      value: 1,
                      message: "Nombre necesario",
                    },
                  })}
                />
                {errorsUpdate.name && (
                  <p className="pt-2 text-red-500 text-base italic">
                    {errorsUpdate.name.message + ""}
                  </p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  {...registerUpdate("username", {
                    required: "Nombre de usuario necesario",
                    minLength: {
                      value: 1,
                      message: "Nombre de usuario necesario",
                    },
                  })}
                />
                {errorsUpdate.username && (
                  <p className="pt-2 text-red-500 text-base italic">
                    {errorsUpdate.username.message + ""}
                  </p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="text"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  {...registerUpdate("email", {
                    required: "Email necesario",
                    minLength: {
                      value: 1,
                      message: "Email necesario",
                    },
                  })}
                />
                {errorsUpdate.email && (
                  <p className="pt-2 text-red-500 text-base italic">
                    {errorsUpdate.email.message + ""}
                  </p>
                )}
              </div>
              <div className="col-span-6 sm:col-full">
                <button
                  onClick={handleSubmitUpdate(submitUpdateUser)}
                  className="text-white flex w-auto bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  type="submit"
                >
                  {isUpdating ? (
                    <Loading color="fill-teal-400" size="h-5 w-5" />
                  ) : (
                    <FontAwesomeIcon
                      icon="floppy-disk"
                      className="mr-2 w-4 h-4"
                    />
                  )}
                  Guardar
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Cambiar contraseña
            </h3>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contraseña actual
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    {...registerPassword("current_password", {
                      required: "Contraseña actual necesaria",
                      minLength: {
                        value: 1,
                        message: "Contraseña actual necesaria",
                      },
                    })}
                  />
                  <FontAwesomeIcon
                    icon={showCurrentPassword ? "eye-slash" : "eye"}
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="text-gray-900 dark:text-white absolute right-0 top-1/2 transform -translate-y-1/2 px-3 py-2 w-6 h-6"
                  />
                </div>
                {errorsPassword.current_password && (
                  <p className="pt-2 text-red-500 text-base italic">
                    {errorsPassword.current_password.message + ""}
                  </p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    {...registerPassword("new_password", {
                      required: "Contraseña nueva necesaria",
                      minLength: {
                        value: 8,
                        message:
                          "La contraseña debe tener al menos 8 caracteres",
                      },
                    })}
                  />
                  <FontAwesomeIcon
                    icon={showNewPassword ? "eye-slash" : "eye"}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="text-gray-900 dark:text-white absolute right-0 top-1/2 transform -translate-y-1/2 px-3 py-2 w-6 h-6"
                  />
                </div>
                {errorsPassword.new_password && (
                  <p className="pt-2 text-red-500 text-base italic">
                    {errorsPassword.new_password.message + ""}
                  </p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirmar nueva contraseña
                </label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  {...registerPassword("new_password_confirmation", {
                    required: "Confirmación de contraseña nueva necesaria",
                    minLength: {
                      value: 8,
                      message: "La contraseña debe tener al menos 8 caracteres",
                    },
                    validate: (value) =>
                      value === newPassword || "Las contraseñas no coinciden",
                  })}
                />
                {errorsPassword.new_password_confirmation && (
                  <p className="pt-2 text-red-500 text-base italic">
                    {errorsPassword.new_password_confirmation.message + ""}
                  </p>
                )}
              </div>
              <div className="col-span-6 sm:col-full">
                <button
                  onClick={handleSubmitPassword(submitChangePassword)}
                  className="text-white flex w-auto bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  type="submit"
                >
                  {isChangingPassword ? (
                    <Loading color="fill-teal-400" size="h-5 w-5" />
                  ) : (
                    <FontAwesomeIcon icon="lock" className="mr-2 w-4 h-4" />
                  )}
                  Cambiar contraseña
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ApiErrorModal />
      <SuccessModal />
      <DeleteModal
        show={deleteCard != null}
        onClose={() => setDeleteCard(null)}
        onDelete={submitDeleteCard}
      />
      <UpdateModal
        show={showCreateCard}
        title="Tarjeta"
        element={undefined}
        onClose={() => setShowCreateCard(false)}
        renderForm={() => <CardForm onSubmit={handleCreateCard} />}
      />
    </>
  );
}
