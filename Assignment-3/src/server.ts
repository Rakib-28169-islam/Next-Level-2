import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
const port = 3000;
let server: Server;
async function main() {
    try {
        await mongoose.connect(
            "mongodb+srv://rakib:12345@test.yzwhh.mongodb.net/mongoose-practise?retryWrites=true&w=majority&appName=test"
        );
        server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
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
