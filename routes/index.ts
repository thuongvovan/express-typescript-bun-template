/*
 * GET home page.
 */
import express from "express";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.render("index", { title: "Express" });
});

export default router;
