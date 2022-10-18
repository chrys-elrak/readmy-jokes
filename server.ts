import express from "express";
import jokeApi from "./src/api/joke.api";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(jokeApi);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});