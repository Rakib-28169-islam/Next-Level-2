import mongoose from "mongoose";
import { validationError } from "./errorHandler.middleware";

export const globalErrorHandler: any = (
  err: any,
  req: any,
  res: any,
  next: any
) => {
 
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json(validationError(err));
  } if (err instanceof mongoose.Error.CastError) {
    console.log(err.message);
    res.status(400).json({
      message: "Invalid ObjectId",
      success: false,
      error: err.message,
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};
