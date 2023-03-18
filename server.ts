import express from "express";
import { apiRouter } from "./routes/api";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use("/api", apiRouter);

app.get("/", (req, res, next) => {
  res.send("Top page");
});

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
