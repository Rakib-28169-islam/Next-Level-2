import mongoose from "mongoose";

export interface IBook extends mongoose.Document {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;


  isAvailableCopies: (quantity: number) => Promise<boolean>;
isValidDueDate: (dueDate: Date) => boolean;
  
}
