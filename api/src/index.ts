import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";

const PORT = 5000;
const app = express();
dotenv.config();
app.use(cors());

app.get("/data", (req, res, next) => {
  fs.readFile(
    path.resolve(__dirname, "assets", "data.json"),
    "utf8",
    (err, json) => {
      if (err) return res.sendStatus(500);
      res.status(200).json(JSON.parse(json));
    }
  );
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
