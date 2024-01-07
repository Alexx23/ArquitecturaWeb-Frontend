import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function ErrorBoundary() {
  return (
    <div className="flex flex-col justify-center items-center px-6 mx-auto h-screen xl:px-0 dark:bg-gray-900">
      <div className="block max-w-md">
        <img src="/img/500.svg" alt="error 500" />
      </div>
      <div className="text-center xl:max-w-3xl">
        <h1 className="mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
          Algo ha ido mal
        </h1>
        <p className="mb-5 text-base font-normal text-gray-500 md:text-lg dark:text-gray-400">
          Siempre es hora de tomar un café. Deberíamos estar de vuelta cuando
          termines tu café.
        </p>
        <Link
          to="/"
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <FontAwesomeIcon icon="angle-left" className="mr-2" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default ErrorBoundary;
