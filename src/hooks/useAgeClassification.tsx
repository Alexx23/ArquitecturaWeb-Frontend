import { useEffect, useState } from "react";
import AgeClassificationAPI, {
  AgeClassification,
} from "../api/AgeClassificationAPI";
import { publish } from "../utils/CustomEvents";

function useAgeClassifications() {
  const [ageClassifications, setAgeClassifications] = useState<
    AgeClassification[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const requestAllAgeClassifications = () => {
    setIsLoading(true);
    AgeClassificationAPI.getAllAgeClassifications()
      .then((res) => {
        setAgeClassifications(res);
      })
      .catch((err) => {
        publish(
          "showApiErrorMessage",
          "No se ha podido cargar la lista de clasificaciones de edades correctamente. Por favor, inténtalo de nuevo en unos minutos."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return {
    ageClassifications,
    isLoading,
    fetchAll: () => requestAllAgeClassifications(),
  };
}

export default useAgeClassifications;
