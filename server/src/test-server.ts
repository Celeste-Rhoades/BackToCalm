import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Works!" });
});

app.post("/test", (req, res) => {
  res.json({ message: "POST works!", body: req.body });
});

app.listen(3000, () => {
  console.log("Test server on port 3000");
});
