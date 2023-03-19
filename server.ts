import express from "express";
import { apiRouter } from "./routes/api";
import { csrfRouter } from "./routes/csrf";
import crypto from "crypto";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(
  express.static("public", {
    setHeaders(res, path, stat) {
      res.header("X-Frame-Options", "SAMEORIGIN");
    },
  })
);
app.use("/api", apiRouter);
app.use("/csrf", csrfRouter);

app.get("/", (req, res, next) => {
  res.send("Top page");
});

app.get("/csp", (req, res) => {
  const nonceValue = crypto.randomBytes(16).toString("base64");
  res.header(
    "Content-Security-Policy",
    `script-src 'nonce-${nonceValue}' 'strict-dynamic';` +
      "object-src 'none';" +
      "base-uri 'none';" +
      "require-trusted-types-for 'script';"
  );
  res.render("csp", { nonce: nonceValue, val: "好きな値を返す" });
});

app.use(express.urlencoded({ extended: true }));
app.post("/signup", (req, res) => {
  console.log(req.body);
  res.send(" アカウント登録しました。");
});

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
