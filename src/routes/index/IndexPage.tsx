import AOS from "aos";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  darkMode: boolean;
}

function IndexPage({ darkMode }: Props) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 1700,
      easing: "ease-out-cubic",
    });
  });

  return (
    <main className="grow">
      <section className="relative min-h-screen">
        <div
          className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1"
          aria-hidden="true"
        >
          <svg
            width="1360"
            height="578"
            viewBox="0 0 1360 578"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="illustration-01"
              >
                <stop stopColor={darkMode ? "#202020" : "#FFF"} offset="0%" />
                <stop
                  stopColor={darkMode ? "#151515" : "#EAEAEA"}
                  offset="77.402%"
                />
                <stop stopColor={darkMode ? "#000" : "#DFDFDF"} offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-12 pb-12 md:pt-20 md:pb-20">
            <div className="text-center pb-12 md:pb-16">
              <Link
                to="/"
                className="place-content-center flex mb-16"
                data-aos="zoom-y-out"
              >
                <img
                  src="/img/logo.png"
                  className="h-28 rounded-3xl"
                  alt="Filmy logo"
                />
              </Link>
              <h1
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 dark:text-white"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Vive la experiencia real del cine con{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  FilmyCinema
                </span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p
                  className="text-xl text-gray-600 mb-8 dark:text-gray-300"
                  data-aos="zoom-y-out"
                  data-aos-delay="300"
                >
                  FilmyCinema es el mejor cine para ver películas y series en
                  con realidad inmersiva. Disfruta de una experiencia
                  cinematográfica única.
                </p>
                <div
                  className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay="450"
                >
                  <div className="mb-4 sm:mb-0 mx-4 relative inline-flex group">
                    <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                    <Link
                      to="/movies"
                      title="Ver películas"
                      className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      role="button"
                    >
                      Ver películas
                    </Link>
                  </div>
                  <div className="mx-4 relative inline-flex group">
                    <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                    <Link
                      to="/register"
                      title="Crear cuenta"
                      className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      role="button"
                    >
                      Crear cuenta
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default IndexPage;
