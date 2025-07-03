import { Schema, model } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";
import { z } from "zod";


const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Books",
      required: [true, "Book reference is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
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

export const createZodBorrowSchema = z.object({
  book: z.string().regex(/^[a-f\d]{24}$/i, "Invalid Book ID format"),
  quantity: z.number().int().min(1, "Quantity must be at least 1 or greater than 0"),
  dueDate: z.coerce.date({ required_error: "Due Date is required" })
  .refine(
    (date) => date > new Date(),
    {
      message: "Due Date must be in the future",
    }
  ),
});

const BorrowModel = model<IBorrow>("Borrows", borrowSchema);
export default BorrowModel;
