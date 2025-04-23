import { BASE_URL } from "../constant/settings.constant";
import {
  ApiResponse,
  ErrorResponse,
  ErrorResponseOptions,
  ResponseOptions,
} from "../types/response.type";

export const responseSuccess = ({
  statusCode = 200,
  message = "ok",
  data = null,
  apiPath,
}: ResponseOptions = {}): ApiResponse => {
  const docsUrl = apiPath
    ? `${BASE_URL}/api/swagger/#${apiPath.replace(/^\/+/, "")}`
    : `${BASE_URL}/api/swagger`;

  return {
    status: "success",
    statusCode,
    message,
    data,
    docs: docsUrl,
  };
};

export const responseError = ({
  statusCode = 500,
  message = "Internal Server Error",
  stack = null,
  apiPath,
}: ErrorResponseOptions = {}): ErrorResponse => {
  const docUrl = apiPath
    ? `${BASE_URL}/api/swagger/#${apiPath.replace(/^\/+/, "")}`
    : `${BASE_URL}/api/swagger`;

  return {
    status: "error",
    statusCode,
    message,
    stack,
    doc: docUrl,
  };
};
