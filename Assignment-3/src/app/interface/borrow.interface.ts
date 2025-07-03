import { Types } from "mongoose";
import { ICreateData } from "./book.interface";

export interface IBorrow  extends ICreateData {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}