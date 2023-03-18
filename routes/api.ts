import express from "express";

const router = express.Router();
router.use(express.json());
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "X-Lang");
  }
  next();
});

router.get("/", (req, res) => {
  res.setHeader("X-Timestamp", Date.now());
  const lang = req.headers["x-lang"];
  const message = req.query.message;

  if (!message) {
    res.status(400);
    if (lang === "en") {
      return res.send({ message: "message is empty." });
    }
    return res.send({ message: "からです" });
  }
  res.send({ message });
});

router.post("/", (req, res) => {
  const body = req.body;
  console.log({ body });
  res.end();
});

export { router as apiRouter };
