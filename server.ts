import express from "express";
import dotenv from "dotenv";
import joke from "./src/joke";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', joke);

app.get('/', (req, res) => {
    res.send('Hello World!');
})
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});