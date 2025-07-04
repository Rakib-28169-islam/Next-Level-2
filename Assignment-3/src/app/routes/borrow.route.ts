import { Request, Response, Router } from "express";
import BorrowModel from "../models/Borrow.model";
import BookModel from "../models/Book.model";
import { apiResponse } from "../utils/apiResponse";

export const borrowRoute = Router();

borrowRoute.post("/", async (req: Request, res: Response, next) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = await BookModel.findById(bookId);

    if (!book) {
     return apiResponse(res, 404, false, "Book not found", null, {
        name: "NotFoundError",
        message: `No book found with ID: ${bookId}`,
        path: "book",
        value: bookId,
      });
    } else {

      const isAvailableCopies = await book.isAvailableCopies(quantity);
      const isValidDueDate = book.isValidDueDate(dueDate);
     

      if (!isAvailableCopies) {
        return apiResponse(res, 400, false, "Not enough copies available", null, {
          name: "NotEnoughCopiesError",
          message: `Not enough copies available for book ID: ${bookId}`,
          path: "quantity",
          value: quantity,
        });
      }
      if(!isValidDueDate) {
       return apiResponse(res, 400, false, "Invalid due date", null, {
            name: "InvalidDueDateError",
            message: "Due date must be in the future",
            path: "dueDate",
            value: dueDate,
        })
      }
      const borrow = await BorrowModel.create({
        book: bookId,
        quantity,
        dueDate,
      });

      return apiResponse(res, 201, true, "Borrow Created Successfully", borrow);
    }
  } catch (err: any) {
    next(err);
  }
});
