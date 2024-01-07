import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:8080/WEB-PracticaFinal/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
  timeout: 20000,
  withCredentials: true,
};

export interface ApiError {
  message: string;
}

export const getMethod = <T>(url: string): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    return axios
      .get<T>(url, axiosConfig)
      .then((response: AxiosResponse<T>) => resolve(response.data))
      .catch((error) => {
        reject(catchError(error));
      });
  });
};

export const postMethod = <T>(url: string, data?: any): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    return axios
      .post<T>(url, data, axiosConfig)
      .then((response: AxiosResponse<T>) => resolve(response.data))
      .catch((error) => {
        reject(catchError(error));
      });
  });
};

export const putMethod = <T>(url: string, data?: any): Promise<T> => {
  const query = new URLSearchParams(data).toString();
  return new Promise<T>((resolve, reject) => {
    return axios
      .put<T>(url + "?" + query, null, axiosConfig)
      .then((response: AxiosResponse<T>) => resolve(response.data))
      .catch((error) => {
        reject(catchError(error));
      });
  });
};

export const deleteMethod = <T>(url: string): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    return axios
      .delete<T>(url, axiosConfig)
      .then((response: AxiosResponse<T>) => resolve(response.data))
      .catch((error) => {
        reject(catchError(error));
      });
  });
};

export interface Paginated<T> {
  data: T[];
  actual_page: number;
  page_size: number;
  total_size: number;
  has_more: boolean;
}

const catchError = (error: AxiosError): any => {
  if (error.code != null && error.code === "ECONNABORTED") {
    return "No se ha podido conectar con el servidor.";
  }
  if (error.code != null && error.code === "ERR_NETWORK") {
    return "No se ha podido establecer conexión con el servidor.";
  }
  if (error.response != null) {
    handleErrorResponse(error.response);
    if ((error.response.data as any)?.message != null) {
      return (error.response.data as any)?.message;
    }
  }
  return "Ha ocurrido un error inesperado.";
};

const handleErrorResponse = (errorResponse: AxiosResponse) => {
  if (errorResponse.status === 401) window.location.replace("/login");
  if (errorResponse.status === 403) window.location.replace("/login");
};
