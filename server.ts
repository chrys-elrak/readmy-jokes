import express from "express";
import dotenv from "dotenv";
import jokeApi from "./src/api/joke.api";
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(jokeApi);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 8000");
});