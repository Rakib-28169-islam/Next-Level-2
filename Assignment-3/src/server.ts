import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const port = 3000;
let server: Server;
async function main() {
    try {
        await mongoose.connect( process.env.MONGODB_URL as string);
        server = app.listen(port, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (e) {
        console.log(e);
        if (server) {
            server.close(() => {
                console.log("Server closed due to an error");
            });
        }
    }
}
main();
