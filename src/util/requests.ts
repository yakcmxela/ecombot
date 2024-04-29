import { ServerResponse } from "./types";


/**
 * Creates the headers for server requests.
 * @returns The headers for server requests.
 */
export const createServerHeaders = (): HeadersInit => {
  return {
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/json",
    "X-Auth-Token": process.env.AUTH_TOKEN ?? "",
    ...(process.env.AUTH_HEADER_KEY &&
      process.env.AUTH_HEADER_VALUE && {
        [process.env.AUTH_HEADER_KEY]: process.env.AUTH_HEADER_VALUE,
      }),
  };
};

/**
 * Creates a request to the server.
 *
 * @param path - The path of the API endpoint.
 * @param params - The parameters for the request, including the action.
 * @returns A promise that resolves to the server response.
 */
export const createRequest = async <T>(
  path: string,
  params: {
    [k: string]: any;
  } & { action: string }
): Promise<ServerResponse<T>> => {
  const headers = createServerHeaders();

  const body = JSON.stringify(
    Object.keys(params).reduce((acc, key) => {
      if (params[key] !== undefined) {
        return { ...acc, [key]: params[key] };
      }
      return acc;
    }, {})
  );

  const url = `${process.env.API_URL}/${path}`;

  const response = await fetch(url, {
    body,
    headers,
    method: "POST",
    redirect: "follow",
  });

  return processResponse(response);
};

/**
 * Checks if the status of a server response is "success".
 * 
 * @param status - The status of the server response.
 * @returns A boolean indicating whether the status is "success".
 */
export const isSuccess = (status: ServerResponse["status"]) =>
  status === "success";

/**
 * Processes the response from an HTTP request.
 * 
 * @param response - The response object returned from the HTTP request.
 * @returns A Promise that resolves to the processed response data.
 * @throws If the response status is 401, the response object is thrown.
 *         If the response status is not 401, but the response data indicates an error,
 *         an error message is thrown.
 */
export const processResponse = async (response: Response) => {
  if (response.status === 401) {
    throw response;
  } else {
    const responseJSON = await response.json();
    if (isSuccess(responseJSON.status)) {
      return responseJSON;
    } else {
      throw (responseJSON.errorMessageUser ||
        responseJSON.errorMessage ||
        "An unknown error occurred") as string;
    }
  }
};
