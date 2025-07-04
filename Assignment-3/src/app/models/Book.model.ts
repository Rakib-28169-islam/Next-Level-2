import { Schema, model } from "mongoose";
import { IBook } from "../interface/book.interface";
import { z } from "zod";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      message: "Genre must be one of the predefined values",
    },
    isbn: {
      type: String,
      required: [true, " ISBN is required"],
      unique: [true, "ISBN must be unique"],
      trim: true,
    },
    description: { type: String },
    copies: {
      type: Number,
      required: [true, "Number of copies is required"],
      min: [0, "Copies cannot be negative"],
    },
    available: {
      type: Boolean,
      default: true,
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const createZodBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z.string().min(1, "ISBN is required"),
  description: z.string().optional(),
  copies: z.number().int().min(0, "Copies must be a positive number"),
  available: z.boolean().optional().default(true),
});

bookSchema.methods.isAvailableCopies =async function (quantity: number) {
  if (this.copies < quantity) {
    return false;
  }
  this.copies -= quantity;
  this.available = this.copies > 0;
  await this.save();
  return true;
};
bookSchema.methods.isValidDueDate = function (dueDate: string) {
    return new Date(dueDate) > new Date();
}
const BookModel = model<IBook>("Books", bookSchema);
export default BookModel;
