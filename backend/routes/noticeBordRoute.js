import express from "express";
const router = express.Router();

import {
  createNotice,
  getAllNotices,
  deleteNotice,
  updateNotice,
} from "../controllers/noticeBordController.js";

router.post("/", createNotice);
router.get("/", getAllNotices);
router.delete("/:noticeId", deleteNotice);
router.put("/:noticeId", updateNotice);

export default router;
