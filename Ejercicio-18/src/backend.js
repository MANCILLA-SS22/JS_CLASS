import express from "express";
const PORT = 5500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("src/public/"));  //Probar con --> http://localhost:5500/static/saiga.jpg

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));