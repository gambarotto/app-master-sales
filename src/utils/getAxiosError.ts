interface ErrorAxiosHandle {
  response?: {
    data: {
      error: string;
      message: string;
      statusCode: number;
      validation: object;
    };
    status: number;
    headers: object;
  };
  request?: string;
  message?: string;
}
interface ResponseError {
  data: string;
  status: string;
  headers: string;
}

export function handleAxiosErrors(error: any): ResponseError | string {
  error as ErrorAxiosHandle;
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      data: error.response.data,
      status: error.response.status,
      headers: error.response.headers,
    };
  }
  if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return error.request;
  }
  // Something happened in setting up the request that triggered an Error
  return error.message;
}
