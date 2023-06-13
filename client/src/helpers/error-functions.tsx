import axios from "axios";

export type ErrorObject = {
  code: number | undefined;
  error: string;
};

export function getErrorMessage(res: ErrorObject | undefined) {
  if (res) return res.error;
  else return "Something went wrong.";
}

export function getAxiosErrorObject(err: unknown) {
  if (axios.isAxiosError(err)) {
    const errorObject: ErrorObject = {
      code: err.response?.status,
      error: err.response?.data.error || err.response?.statusText,
    };
    return errorObject;
  } else return undefined;
}

export const createTimeoutPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Request timeout."));
    }, 5000);
  });
};

export function newAbortSignal(timeoutMs: 5000) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}
