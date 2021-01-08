import { Router, Request, Response, application } from "express";
import bodyParser from "body-parser";

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/photos", async (req: Request, res: Response) => {
  res.json({ message: "hi" });
});

router.post("/photos", async (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ message: req.body.message });
});

export default router;
