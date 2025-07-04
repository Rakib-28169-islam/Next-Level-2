import { Response } from "express";

export const apiResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: any,
  error?: any
) => {

  const err = error
    ? {
        name: error?.name,
        message: error?.message,
        path: error?.path,
        value: error?.value,
      }
    : undefined;

  const response: any = {
    success,
    message,
  };

  if (success) {
    if (data !== undefined && data !== null) response.data = data;
  } else {
    if (err !== undefined && err !== null) response.error = err;
  }

  return res.status(statusCode).json(response);
};
