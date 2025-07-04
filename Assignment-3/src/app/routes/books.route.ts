import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import BookModel from "../models/Book.model";
import { validationError } from "../utils/errorHandler.middleware";
import { apiResponse } from "../utils/apiResponse";

export const booksRoute = Router();

booksRoute.post("/", async (req: Request, res: Response, next) => {
  try {
    const result = await BookModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
        success: false,
        message: "Failed to create book",
        error: err.message,
    })
  }
});

booksRoute.get("/", async (req: Request, res: Response, next) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "asc",
      limit = 10,
    } = req.query;

    const query: Record<string, any> = {};

    if (filter) {
      query.filter = (filter as string).toUpperCase();
    }

    // console.log({
    //   filter,
    //   sortBy,
    //   sort,
    //   limit,
    // });

    const result = await BookModel.find(
      query.filter ? { genre: query.filter } : {}
    )
      .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
      .limit(limit as number);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
});

booksRoute.get("/:id", async (req: Request, res: Response, next) => {
  const { id } = req.params;
  try {
    const result = await BookModel.findById(id);
    let message = "";
    if (!result) {
      message = "No book found with this ID";
    } else {
      message = "Book retrieved successfully";
    }

    res.status(200).json({
      success: true,
      message: message,
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
});

booksRoute.put("/:id", async (req: Request, res: Response, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const result = await BookModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: {
          name: "NotFoundError",
          message: `No book found with ID: ${id}`,
          path: "id",
          value: id,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
});
booksRoute.delete("/:id", async (req: Request, res: Response, next) => {
  const { id } = req.params;
  try {
    const result = await BookModel.findByIdAndDelete(id);
    if (!result) {
      return apiResponse(res,404,false,"Book not found",null,{
        name: "NotFoundError",
        message: `No book found with ID: ${id}`,
        path: "id",
        value: id,  
      })
    }
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    })
  } catch (err: any) {
    next(err);
  }
});
