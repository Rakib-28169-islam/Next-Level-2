import { Schema, model } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";



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
    }
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

const BorrowModel = model<IBorrow>("Borrows", borrowSchema);
export default BorrowModel;
