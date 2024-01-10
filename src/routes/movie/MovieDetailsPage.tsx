import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import MovieAPI, { Movie } from "../../api/MovieAPI";
import { BuyObject } from "../../api/PaymentAPI";
import CastSlide from "../../components/client/CastSlide";
import Container from "../../components/client/Container";
import ImageHeader from "../../components/client/ImageHeader";
import MovieComment from "../../components/client/MovieComment";
import AccountNeededModal from "../../components/modals/AccountNeededModal";
import PayModal from "../../components/modals/PayModal";
import SessionsModal from "../../components/modals/SessionsModal";
import uiConfigs from "../../configs/ui.configs";
import { useUser } from "../../context/UserContext";
import { publish } from "../../utils/CustomEvents";
import { getImageUrl } from "../../utils/RandomImage";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [searchParams] = useSearchParams();

  const [movie, setMovie] = useState<Movie | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [buyObject, setBuyObject] = useState<BuyObject | null>(null);

  const { user } = useUser();

  const getChipColorClass = (ageClassificationid: number) => {
    switch (ageClassificationid) {
      case 1: // Todo público
        return " bg-lime-600 text-lime-50 dark:bg-lime-300 dark:text-lime-900";
      case 2: // 7 años
        return " bg-green-600 text-green-50 dark:bg-green-300 dark:text-green-900";
      case 3: // 12 años
        return " bg-blue-600 text-blue-50 dark:bg-blue-300 dark:text-blue-900";
      case 4: // 16 años
        return " bg-amber-600 text-amber-50 dark:bg-amber-300 dark:text-amber-900";
      case 5: // 18 años
      case 6: // Pornografía
        return " bg-red-600 text-red-50 dark:bg-red-300 dark:text-red-900";

      default:
        return "";
    }
  };

  useEffect(() => {
    if (!movieId) return;
    if (!Number(movieId)) return;
    MovieAPI.getMovie(Number(movieId))
      .then((res) => {
        setMovie(res);
      })
      .catch((err) => {
        publish(
          "showApiErrorMessage",
          "No se ha podido cargar la película. Por favor, inténtalo de nuevo en unos minutos."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  useEffect(() => {
    if (searchParams.get("buy") != null && user) {
      const base64 = searchParams.get("buy");
      if (base64 == null) return;
      const buyObject: BuyObject = JSON.parse(atob(base64));
      setBuyObject(buyObject);
      setShowPayModal(true);
    }
  }, [searchParams, user]);

  return !movie ? (
    <></>
  ) : (
    <>
      <ImageHeader imgPath={getImageUrl(movie.id)} />
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        <Box
          sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
          }}
        >
          <Link
            to="/movies"
            className="mb-4 mt-[-10px] relative z-[5] text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <FontAwesomeIcon icon="angle-left" className="mr-2" />
            Volver atrás
          </Link>
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            <Box
              sx={{
                zIndex: "5",
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "140%",
                  borderRadius: "5px",
                  ...uiConfigs.style.backgroundImage(getImageUrl(movie.id)),
                }}
              />
            </Box>

            <Box
              sx={{
                zIndex: "5",
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
              }}
            >
              <Stack spacing={5}>
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                >
                  {`${movie.name} ${`(${movie.year})`}`}
                </Typography>
                <span
                  style={{ marginTop: 0 }}
                  className="mt-[-40px] text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  {movie.original_title}
                </span>
                <button
                  onClick={() => setShowSessionsModal(true)}
                  className="max-w-[15rem] z-[5] text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <FontAwesomeIcon icon="cart-shopping" className="mr-2" />
                  COMPRAR ENTRADAS
                </button>
                <Stack direction="row" spacing={1} alignItems="center">
                  <span className="text-base text-gray-900 dark:text-gray-100">
                    Género:
                  </span>
                  <span className="bg-blue-800 text-blue-50 text-sm xl:text-base font-semibold me-2 px-3 py-1 rounded-full dark:bg-blue-300 dark:text-blue-900">
                    {movie.genre.name}
                  </span>
                  <Divider orientation="vertical" />
                  <span className="text-base text-gray-900 dark:text-gray-100">
                    Clasificación:
                  </span>
                  <span
                    className={
                      "text-sm xl:text-base font-semibold me-2 px-3 py-1 rounded-full" +
                      getChipColorClass(movie.age_classification.id)
                    }
                  >
                    {movie.age_classification.name}
                  </span>
                </Stack>
                <p className="text-base text-gray-900 dark:text-gray-100">
                  {movie.synopsis}fdsf
                </p>
                <p className="leading-8 text-base text-gray-900 dark:text-gray-100">
                  Duración: {movie.duration}
                  {" minutos"}
                  <br />
                  Director: {movie.director.name}
                  <br />
                  Distribuidor: {movie.distributor.name}
                </p>
                {movie.actor_list.length > 0 && (
                  <Container header="Reparto">
                    <CastSlide actors={movie.actor_list} />
                  </Container>
                )}
              </Stack>
            </Box>
          </Box>
        </Box>
        <div className="mb-12">
          {user ? (
            <MovieComment movie={movie} />
          ) : (
            <Container header="Comentarios">
              <p className="text-base text-gray-900 dark:text-gray-100 font-semibold">
                <Link
                  to="/login"
                  className="text-primary-700 hover:underline dark:text-primary-500"
                >
                  Inicia sesión
                </Link>{" "}
                para poder ver los comentarios y subir tus propios comentarios.
              </p>
            </Container>
          )}
        </div>
      </Box>
      <SessionsModal
        show={showSessionsModal}
        onClose={() => setShowSessionsModal(false)}
        onOpen={() => setShowSessionsModal(true)}
        movie={movie}
      />
      <PayModal
        show={buyObject != null && user != null && showPayModal}
        onClose={() => setShowPayModal(false)}
        onOpen={() => setShowPayModal(true)}
        buyObject={buyObject}
      />
    </>
  );
};

export default MovieDetailsPage;
